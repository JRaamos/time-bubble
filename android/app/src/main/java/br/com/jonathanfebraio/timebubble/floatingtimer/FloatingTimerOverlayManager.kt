package br.com.jonathanfebraio.timebubble.floatingtimer

import android.content.Context
import android.graphics.Color
import android.graphics.PixelFormat
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.util.DisplayMetrics
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
import br.com.jonathanfebraio.timebubble.R
import kotlin.math.abs
import kotlin.math.roundToLong

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
        fun onSettingsRequested()
    }

    private val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    private val touchSlop = dpToPx(8)
    private val closeRevealLongPressTimeoutMs =
        ((ViewConfiguration.getLongPressTimeout().toLong() + 450L) * CLOSE_REVEAL_TIMEOUT_FACTOR).roundToLong()

    private var rootView: LinearLayout? = null
    private var cardView: FrameLayout? = null
    private var cardBackground: GradientDrawable? = null
    private var timerTextView: TextView? = null
    private var actionsRowView: LinearLayout? = null
    private var closeButtonView: TextView? = null
    private var settingsButtonView: TextView? = null
    private var layoutParams: WindowManager.LayoutParams? = null

    fun show() {
        if (rootView != null) {
            applyScale(FloatingTimerStateStore.overlayScale)
            clampAndUpdateLayout()
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
            typeface = resolveTimerTypeface()
            gravity = Gravity.CENTER
            text = formatElapsed(FloatingTimerStateStore.getElapsedMs())
        }

        val actionsRow = LinearLayout(context).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.END
            visibility = View.GONE
        }

        val settingsView = TextView(context).apply {
            text = context.getString(R.string.floating_timer_settings_button)
            setTextColor(Color.WHITE)
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 14f)
            typeface = Typeface.DEFAULT_BOLD
            gravity = Gravity.CENTER
            this.background = GradientDrawable().apply {
                cornerRadius = dpToPx(18).toFloat()
                setColor(ContextCompat.getColor(context, R.color.floating_timer_border))
            }
            setPadding(dpToPx(14), dpToPx(8), dpToPx(14), dpToPx(8))
            setOnClickListener { listener.onSettingsRequested() }
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

        actionsRow.addView(
            settingsView,
            LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT,
            ).apply {
                marginEnd = dpToPx(8)
            },
        )

        actionsRow.addView(
            closeView,
            LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT,
            ),
        )

        root.addView(
            actionsRow,
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
        actionsRowView = actionsRow
        settingsButtonView = settingsView
        closeButtonView = closeView
        layoutParams = params

        applyScale(FloatingTimerStateStore.overlayScale)
        applyAppearance()
        attachTouchHandling(root, card, params)
        windowManager.addView(root, params)
        root.post {
            if (clampPosition(root, params)) {
                windowManager.updateViewLayout(root, params)
                listener.onPositionChanged(params.x, params.y)
            }
        }
    }

    fun applyAppearance() {
        cardBackground?.setColor(FloatingTimerAppearanceStore.resolveBackgroundColor(context))
        timerTextView?.setTextColor(FloatingTimerAppearanceStore.resolveTextColor(context))
        timerTextView?.typeface = resolveTimerTypeface()
        timerTextView?.letterSpacing = resolveLetterSpacing()
        rootView?.requestLayout()
    }

    fun setKeepScreenOn(keepScreenOn: Boolean) {
        val root = rootView ?: return
        val params = layoutParams ?: return
        val nextFlags = if (keepScreenOn) {
            params.flags or WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
        } else {
            params.flags and WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON.inv()
        }

        if (params.flags == nextFlags) {
            return
        }

        params.flags = nextFlags
        windowManager.updateViewLayout(root, params)
    }

    fun updateTimeText(text: String) {
        timerTextView?.text = text
    }

    fun remove() {
        setKeepScreenOn(false)
        rootView?.let(windowManager::removeView)
        rootView = null
        cardView = null
        cardBackground = null
        timerTextView = null
        actionsRowView = null
        closeButtonView = null
        settingsButtonView = null
        layoutParams = null
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
                clampPosition(root, params)
                windowManager.updateViewLayout(root, params)
                listener.onPositionChanged(params.x, params.y)
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
                            clampPosition(root, params)
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

    private fun clampAndUpdateLayout() {
        val root = rootView ?: return
        val params = layoutParams ?: return

        if (clampPosition(root, params)) {
            windowManager.updateViewLayout(root, params)
            listener.onPositionChanged(params.x, params.y)
        }
    }

    private fun clampPosition(root: View, params: WindowManager.LayoutParams): Boolean {
        root.measure(
            View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
            View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
        )

        val overlayWidth = getMeasuredSize(root.measuredWidth, root.width)
        val overlayHeight = getMeasuredSize(root.measuredHeight, root.height)

        if (overlayWidth <= 0 || overlayHeight <= 0) {
            return false
        }

        val bounds = getScreenBounds()
        val minX = -(overlayWidth / 2)
        val maxX = (bounds.first - (overlayWidth / 2)).coerceAtLeast(minX)
        val minY = -(overlayHeight / 2)
        val maxY = (bounds.second - (overlayHeight / 2)).coerceAtLeast(minY)
        val nextX = params.x.coerceIn(minX, maxX)
        val nextY = params.y.coerceIn(minY, maxY)

        if (params.x == nextX && params.y == nextY) {
            return false
        }

        params.x = nextX
        params.y = nextY
        return true
    }

    private fun getMeasuredSize(size: Int, measuredSize: Int): Int {
        return when {
            size > 0 -> size
            measuredSize > 0 -> measuredSize
            else -> 0
        }
    }

    private fun getScreenBounds(): Pair<Int, Int> {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val bounds = windowManager.currentWindowMetrics.bounds
            return Pair(bounds.width(), bounds.height())
        }

        val metrics = DisplayMetrics()
        @Suppress("DEPRECATION")
        windowManager.defaultDisplay.getMetrics(metrics)
        return Pair(metrics.widthPixels, metrics.heightPixels)
    }

    private fun showCloseButton() {
        actionsRowView?.visibility = View.VISIBLE
    }

    private fun hideCloseButton() {
        actionsRowView?.visibility = View.GONE
    }

    private fun isCloseVisible(): Boolean {
        return actionsRowView?.visibility == View.VISIBLE
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

        if (!FloatingTimerAppearanceStore.getShowMilliseconds(context)) {
            return String.format("%02d:%02d", minutes, seconds)
        }

        val milliseconds = elapsedMs % 1000
        return String.format("%02d:%02d.%03d", minutes, seconds, milliseconds)
    }

    private fun resolveTimerTypeface(): Typeface {
        return when (FloatingTimerAppearanceStore.getFontKey(context)) {
            "ds-digib" -> Typeface.create(Typeface.MONOSPACE, Typeface.BOLD)
            "ds-digii" -> Typeface.MONOSPACE
            "sans-condensed" -> Typeface.create("sans-serif-condensed", Typeface.NORMAL)
            "sans-medium" -> Typeface.create("sans-serif-medium", Typeface.NORMAL)
            "serif" -> Typeface.SERIF
            "ds-digit" -> Typeface.create(Typeface.MONOSPACE, Typeface.BOLD)
            "roboto-mono" -> Typeface.create(Typeface.MONOSPACE, Typeface.NORMAL)
            "space-mono" -> Typeface.create(Typeface.MONOSPACE, Typeface.BOLD)
            "dm-mono" -> Typeface.create("sans-serif-light", Typeface.NORMAL)
            else -> Typeface.MONOSPACE
        }
    }

    private fun resolveLetterSpacing(): Float {
        return when (FloatingTimerAppearanceStore.getFontKey(context)) {
            "ds-digii" -> 0.08f
            "ds-digit" -> 0.12f
            "sans-condensed" -> -0.03f
            "roboto-mono" -> 0.02f
            "space-mono" -> 0.06f
            "dm-mono" -> -0.01f
            else -> 0f
        }
    }

    companion object {
        private const val CLOSE_REVEAL_TIMEOUT_FACTOR = 0.7
        private const val MIN_SCALE = 0.75f
        private const val MAX_SCALE = 1.8f
    }
}
