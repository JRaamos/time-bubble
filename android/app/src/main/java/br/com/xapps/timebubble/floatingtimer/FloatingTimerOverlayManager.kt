package br.com.xapps.timebubble.floatingtimer

import android.content.Context
import android.graphics.Color
import android.graphics.PixelFormat
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.util.TypedValue
import android.view.GestureDetector
import android.view.Gravity
import android.view.MotionEvent
import android.view.ScaleGestureDetector
import android.view.View
import android.view.ViewConfiguration
import android.view.WindowManager
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import br.com.xapps.timebubble.R
import kotlin.math.abs

class FloatingTimerOverlayManager(
    private val context: Context,
    private val listener: Listener,
) {
    interface Listener {
        fun onToggleRequested()
        fun onResetRequested()
        fun onPositionChanged(x: Int, y: Int)
        fun onScaleChanged(scale: Float)
        fun onCloseRequested()
    }

    private val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    private val touchSlop = dpToPx(8)
    private val closeRevealLongPressTimeoutMs = ViewConfiguration.getLongPressTimeout().toLong() + 450L

    private var rootView: LinearLayout? = null
    private var cardView: FrameLayout? = null
    private var cardBackground: GradientDrawable? = null
    private var timerTextView: TextView? = null
    private var closeButtonView: TextView? = null

    fun show() {
        if (rootView != null) {
            applyScale(FloatingTimerStateStore.overlayScale)
            updateTimeText(formatElapsed(FloatingTimerStateStore.getElapsedMs()))
            return
        }

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            } else {
                @Suppress("DEPRECATION")
                WindowManager.LayoutParams.TYPE_PHONE
            },
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            PixelFormat.TRANSLUCENT,
        ).apply {
            gravity = Gravity.TOP or Gravity.START
            x = if (FloatingTimerStateStore.overlayX >= 0) FloatingTimerStateStore.overlayX else dpToPx(24)
            y = if (FloatingTimerStateStore.overlayY >= 0) FloatingTimerStateStore.overlayY else dpToPx(140)
        }

        val root = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.END
        }

        val background = GradientDrawable().apply {
            setColor(FloatingTimerAppearanceStore.resolveBackgroundColor(context))
            setStroke(dpToPx(1), ContextCompat.getColor(context, R.color.floating_timer_border))
        }

        val card = FrameLayout(context).apply {
            this.background = background
            elevation = dpToPx(12).toFloat()
        }

        val timeView = TextView(context).apply {
            setTextColor(FloatingTimerAppearanceStore.resolveTextColor(context))
            typeface = Typeface.MONOSPACE
            gravity = Gravity.CENTER
            text = formatElapsed(FloatingTimerStateStore.getElapsedMs())
        }

        val closeView = TextView(context).apply {
            text = context.getString(R.string.floating_timer_close_button)
            setTextColor(Color.WHITE)
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 14f)
            typeface = Typeface.DEFAULT_BOLD
            gravity = Gravity.CENTER
            this.background = GradientDrawable().apply {
                cornerRadius = dpToPx(18).toFloat()
                setColor(ContextCompat.getColor(context, R.color.floating_timer_close_background))
            }
            visibility = View.GONE
            setPadding(dpToPx(14), dpToPx(8), dpToPx(14), dpToPx(8))
            setOnClickListener { listener.onCloseRequested() }
        }

        card.addView(
            timeView,
            FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.WRAP_CONTENT,
                FrameLayout.LayoutParams.WRAP_CONTENT,
                Gravity.CENTER,
            ),
        )

        root.addView(
            card,
            LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT,
            ),
        )

        root.addView(
            closeView,
            LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT,
            ).apply {
                topMargin = dpToPx(8)
                gravity = Gravity.END
                marginEnd = dpToPx(4)
            },
        )

        rootView = root
        cardView = card
        cardBackground = background
        timerTextView = timeView
        closeButtonView = closeView

        applyScale(FloatingTimerStateStore.overlayScale)
        applyAppearance()
        attachTouchHandling(root, card, params)
        windowManager.addView(root, params)
    }

    fun applyAppearance() {
        cardBackground?.setColor(FloatingTimerAppearanceStore.resolveBackgroundColor(context))
        timerTextView?.setTextColor(FloatingTimerAppearanceStore.resolveTextColor(context))
        rootView?.requestLayout()
    }

    fun updateTimeText(text: String) {
        timerTextView?.text = text
    }

    fun remove() {
        rootView?.let(windowManager::removeView)
        rootView = null
        cardView = null
        cardBackground = null
        timerTextView = null
        closeButtonView = null
    }

    private fun attachTouchHandling(root: LinearLayout, card: FrameLayout, params: WindowManager.LayoutParams) {
        val gestureDetector = GestureDetector(context, object : GestureDetector.SimpleOnGestureListener() {
            override fun onDown(event: MotionEvent): Boolean = true

            override fun onSingleTapConfirmed(event: MotionEvent): Boolean {
                if (isCloseVisible()) {
                    hideCloseButton()
                } else {
                    listener.onToggleRequested()
                }
                return true
            }

            override fun onDoubleTap(event: MotionEvent): Boolean {
                if (isCloseVisible()) {
                    hideCloseButton()
                } else {
                    listener.onResetRequested()
                }
                return true
            }
        }).apply {
            setIsLongpressEnabled(false)
        }

        val scaleDetector = ScaleGestureDetector(context, object : ScaleGestureDetector.SimpleOnScaleGestureListener() {
            override fun onScaleBegin(detector: ScaleGestureDetector): Boolean {
                hideCloseButton()
                return true
            }

            override fun onScale(detector: ScaleGestureDetector): Boolean {
                val nextScale = (FloatingTimerStateStore.overlayScale * detector.scaleFactor)
                    .coerceIn(MIN_SCALE, MAX_SCALE)
                if (nextScale == FloatingTimerStateStore.overlayScale) {
                    return true
                }

                FloatingTimerStateStore.overlayScale = nextScale
                applyScale(nextScale)
                windowManager.updateViewLayout(root, params)
                listener.onScaleChanged(nextScale)
                return true
            }
        })

        var initialX = 0
        var initialY = 0
        var initialTouchX = 0f
        var initialTouchY = 0f
        var dragging = false
        var scaling = false
        var longPressTriggered = false
        val revealCloseButtonRunnable = Runnable {
            if (!dragging && !scaling) {
                longPressTriggered = true
                showCloseButton()
            }
        }

        fun cancelRevealCloseButton() {
            card.removeCallbacks(revealCloseButtonRunnable)
        }

        card.setOnTouchListener { _, event ->
            scaleDetector.onTouchEvent(event)

            when (event.actionMasked) {
                MotionEvent.ACTION_DOWN -> {
                    cancelRevealCloseButton()
                    initialX = params.x
                    initialY = params.y
                    initialTouchX = event.rawX
                    initialTouchY = event.rawY
                    dragging = false
                    scaling = false
                    longPressTriggered = false
                    card.postDelayed(revealCloseButtonRunnable, closeRevealLongPressTimeoutMs)
                    gestureDetector.onTouchEvent(event)
                    true
                }

                MotionEvent.ACTION_POINTER_DOWN -> {
                    cancelRevealCloseButton()
                    scaling = true
                    hideCloseButton()
                    true
                }

                MotionEvent.ACTION_MOVE -> {
                    if (scaleDetector.isInProgress || event.pointerCount > 1 || scaling) {
                        cancelRevealCloseButton()
                        scaling = true
                        hideCloseButton()
                        true
                    } else {
                        val deltaX = (event.rawX - initialTouchX).toInt()
                        val deltaY = (event.rawY - initialTouchY).toInt()

                        if (!dragging && (abs(deltaX) > touchSlop || abs(deltaY) > touchSlop)) {
                            cancelRevealCloseButton()
                            dragging = true
                            hideCloseButton()
                        }

                        if (dragging) {
                            params.x = initialX + deltaX
                            params.y = initialY + deltaY
                            windowManager.updateViewLayout(root, params)
                            listener.onPositionChanged(params.x, params.y)
                        } else {
                            gestureDetector.onTouchEvent(event)
                        }

                        true
                    }
                }

                MotionEvent.ACTION_POINTER_UP -> {
                    cancelRevealCloseButton()
                    scaling = event.pointerCount - 1 > 1 || scaleDetector.isInProgress
                    true
                }

                MotionEvent.ACTION_UP,
                MotionEvent.ACTION_CANCEL -> {
                    cancelRevealCloseButton()
                    if (!dragging && !scaling && !longPressTriggered) {
                        gestureDetector.onTouchEvent(event)
                    }
                    dragging = false
                    scaling = false
                    longPressTriggered = false
                    true
                }

                else -> {
                    if (!scaling && !longPressTriggered) {
                        gestureDetector.onTouchEvent(event)
                    }
                    true
                }
            }
        }
    }

    private fun applyScale(scale: Float) {
        val cardPaddingHorizontal = (dpToPx(22) * scale).toInt()
        val cardPaddingVertical = (dpToPx(8) * scale).toInt()
        val cardRadius = dpToPx(22) * scale
        val cardStroke = (dpToPx(1) * scale).toInt().coerceAtLeast(1)
        val cardElevation = dpToPx(12) * scale
        val textSize = (30f * scale).coerceIn(22f, 52f)

        cardView?.setPadding(
            cardPaddingHorizontal,
            cardPaddingVertical,
            cardPaddingHorizontal,
            cardPaddingVertical,
        )
        cardView?.elevation = cardElevation
        cardBackground?.cornerRadius = cardRadius
        cardBackground?.setStroke(cardStroke, ContextCompat.getColor(context, R.color.floating_timer_border))
        timerTextView?.setTextSize(TypedValue.COMPLEX_UNIT_SP, textSize)
        rootView?.requestLayout()
    }

    private fun showCloseButton() {
        closeButtonView?.visibility = View.VISIBLE
    }

    private fun hideCloseButton() {
        closeButtonView?.visibility = View.GONE
    }

    private fun isCloseVisible(): Boolean {
        return closeButtonView?.visibility == View.VISIBLE
    }

    private fun dpToPx(value: Int): Int {
        return TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP,
            value.toFloat(),
            context.resources.displayMetrics,
        ).toInt()
    }

    private fun formatElapsed(elapsedMs: Long): String {
        val minutes = elapsedMs / 60000
        val seconds = (elapsedMs % 60000) / 1000
        val milliseconds = elapsedMs % 1000

        return String.format("%02d:%02d.%03d", minutes, seconds, milliseconds)
    }

    companion object {
        private const val MIN_SCALE = 0.75f
        private const val MAX_SCALE = 1.8f
    }
}
