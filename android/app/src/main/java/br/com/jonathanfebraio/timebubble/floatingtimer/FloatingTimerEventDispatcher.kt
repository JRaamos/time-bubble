package br.com.jonathanfebraio.timebubble.floatingtimer

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule

object FloatingTimerEventDispatcher {
    private var reactContext: ReactApplicationContext? = null

    fun bind(context: ReactApplicationContext) {
        reactContext = context
    }

    fun emitState() {
        val context = reactContext ?: return
        if (!context.hasActiveReactInstance()) {
            return
        }

        val payload = Arguments.createMap().apply {
            putBoolean("visible", FloatingTimerStateStore.isOverlayVisible)
            putBoolean("running", FloatingTimerStateStore.isRunning)
            putDouble("elapsedMs", FloatingTimerStateStore.getElapsedMs().toDouble())
        }

        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("floatingTimerStateChanged", payload)
    }
}
