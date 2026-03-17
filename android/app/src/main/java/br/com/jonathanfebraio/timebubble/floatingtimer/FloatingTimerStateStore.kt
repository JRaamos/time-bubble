package br.com.jonathanfebraio.timebubble.floatingtimer

import android.os.SystemClock

object FloatingTimerStateStore {
    var isOverlayVisible: Boolean = false
    var isRunning: Boolean = false
    var accumulatedElapsedMs: Long = 0L
    var startedAtElapsedRealtime: Long = 0L
    var overlayX: Int = -1
    var overlayY: Int = -1
    var overlayScale: Float = 1f

    fun getElapsedMs(): Long {
        return if (isRunning && startedAtElapsedRealtime > 0L) {
            accumulatedElapsedMs + (SystemClock.elapsedRealtime() - startedAtElapsedRealtime)
        } else {
            accumulatedElapsedMs
        }
    }
}
