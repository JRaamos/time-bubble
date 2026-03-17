package br.com.jonathanfebraio.timebubble.floatingtimer

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.os.SystemClock
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import br.com.jonathanfebraio.timebubble.MainActivity
import br.com.jonathanfebraio.timebubble.R

class FloatingTimerService : Service(), FloatingTimerOverlayManager.Listener {
    private val handler = Handler(Looper.getMainLooper())
    private var overlayManager: FloatingTimerOverlayManager? = null
    private var lastStateBroadcastAt = 0L

    private val ticker = object : Runnable {
        override fun run() {
            overlayManager?.updateTimeText(formatElapsed(FloatingTimerStateStore.getElapsedMs()))

            val now = SystemClock.elapsedRealtime()
            if (now - lastStateBroadcastAt >= 100L) {
                FloatingTimerEventDispatcher.emitState()
                lastStateBroadcastAt = now
            }

            if (FloatingTimerStateStore.isRunning) {
                handler.postDelayed(this, 16L)
            }
        }
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        overlayManager = FloatingTimerOverlayManager(this, this)
        activeInstance = this
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_HIDE -> {
                hideOverlay()
                return START_NOT_STICKY
            }

            else -> showOverlay()
        }

        return START_STICKY
    }

    override fun onDestroy() {
        handler.removeCallbacksAndMessages(null)
        overlayManager?.remove()
        overlayManager = null
        FloatingTimerStateStore.isOverlayVisible = false
        FloatingTimerEventDispatcher.emitState()
        if (activeInstance === this) {
            activeInstance = null
        }
        super.onDestroy()
    }

    override fun onToggleRequested() {
        if (FloatingTimerStateStore.isRunning) {
            FloatingTimerStateStore.accumulatedElapsedMs = FloatingTimerStateStore.getElapsedMs()
            FloatingTimerStateStore.isRunning = false
            FloatingTimerStateStore.startedAtElapsedRealtime = 0L
            handler.removeCallbacks(ticker)
        } else {
            FloatingTimerStateStore.startedAtElapsedRealtime = SystemClock.elapsedRealtime()
            FloatingTimerStateStore.isRunning = true
            lastStateBroadcastAt = 0L
            handler.removeCallbacks(ticker)
            handler.post(ticker)
        }

        overlayManager?.updateTimeText(formatElapsed(FloatingTimerStateStore.getElapsedMs()))
        FloatingTimerEventDispatcher.emitState()
    }

    override fun onResetRequested() {
        FloatingTimerStateStore.accumulatedElapsedMs = 0L
        FloatingTimerStateStore.startedAtElapsedRealtime = 0L
        FloatingTimerStateStore.isRunning = false
        handler.removeCallbacks(ticker)
        overlayManager?.updateTimeText(formatElapsed(0L))
        FloatingTimerEventDispatcher.emitState()
    }

    override fun onPositionChanged(x: Int, y: Int) {
        FloatingTimerStateStore.overlayX = x
        FloatingTimerStateStore.overlayY = y
    }

    override fun onScaleChanged(scale: Float) {
        FloatingTimerStateStore.overlayScale = scale
    }

    override fun onCloseRequested() {
        hideOverlay()
    }

    private fun showOverlay() {
        startForeground(NOTIFICATION_ID, buildNotification())
        overlayManager?.show()
        overlayManager?.applyAppearance()
        overlayManager?.updateTimeText(formatElapsed(FloatingTimerStateStore.getElapsedMs()))

        FloatingTimerStateStore.isOverlayVisible = true
        FloatingTimerEventDispatcher.emitState()

        if (FloatingTimerStateStore.isRunning) {
            handler.removeCallbacks(ticker)
            handler.post(ticker)
        }
    }

    private fun hideOverlay() {
        FloatingTimerStateStore.accumulatedElapsedMs = FloatingTimerStateStore.getElapsedMs()
        FloatingTimerStateStore.startedAtElapsedRealtime = 0L
        FloatingTimerStateStore.isRunning = false
        FloatingTimerStateStore.isOverlayVisible = false
        handler.removeCallbacks(ticker)
        overlayManager?.remove()
        FloatingTimerEventDispatcher.emitState()
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    private fun buildNotification(): Notification {
        val launchIntent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }

        val contentPendingIntent = PendingIntent.getActivity(
            this,
            100,
            launchIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )

        val closeIntent = Intent(this, FloatingTimerService::class.java).apply {
            action = ACTION_HIDE
        }

        val closePendingIntent = PendingIntent.getService(
            this,
            101,
            closeIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )

        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.notification_icon)
            .setContentTitle(getString(R.string.floating_timer_notification_title))
            .setContentText(getString(R.string.floating_timer_notification_text))
            .setContentIntent(contentPendingIntent)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .addAction(0, getString(R.string.floating_timer_notification_close), closePendingIntent)
            .setColor(ContextCompat.getColor(this, R.color.notification_icon_color))
            .setForegroundServiceBehavior(NotificationCompat.FOREGROUND_SERVICE_IMMEDIATE)
            .build()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return
        }

        val channel = NotificationChannel(
            CHANNEL_ID,
            getString(R.string.floating_timer_channel_name),
            NotificationManager.IMPORTANCE_LOW,
        ).apply {
            description = getString(R.string.floating_timer_channel_description)
            setShowBadge(false)
        }

        val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        manager.createNotificationChannel(channel)
    }

    private fun formatElapsed(elapsedMs: Long): String {
        val minutes = elapsedMs / 60000
        val seconds = (elapsedMs % 60000) / 1000
        val milliseconds = elapsedMs % 1000

        return String.format("%02d:%02d.%03d", minutes, seconds, milliseconds)
    }

    companion object {
        private const val CHANNEL_ID = "floating_timer_overlay"
        private const val NOTIFICATION_ID = 1201
        private var activeInstance: FloatingTimerService? = null

        const val ACTION_HIDE = "br.com.jonathanfebraio.timebubble.floatingtimer.HIDE"
        const val ACTION_SHOW = "br.com.jonathanfebraio.timebubble.floatingtimer.SHOW"

        fun show(context: Context) {
            val intent = Intent(context, FloatingTimerService::class.java).apply {
                action = ACTION_SHOW
            }

            ContextCompat.startForegroundService(context, intent)
        }

        fun hide(context: Context) {
            val intent = Intent(context, FloatingTimerService::class.java).apply {
                action = ACTION_HIDE
            }

            context.startService(intent)
        }

        fun refreshAppearance() {
            activeInstance?.overlayManager?.applyAppearance()
        }
    }
}
