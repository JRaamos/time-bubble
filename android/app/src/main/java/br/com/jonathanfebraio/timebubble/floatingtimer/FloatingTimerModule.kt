package br.com.jonathanfebraio.timebubble.floatingtimer

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class FloatingTimerModule(
    reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
    init {
        FloatingTimerEventDispatcher.bind(reactContext)
    }

    override fun getName(): String = "FloatingTimerModule"

    @ReactMethod
    fun getOverlayPermissionStatus(promise: Promise) {
        val granted = Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(reactApplicationContext)
        Log.d(TAG, "getOverlayPermissionStatus granted=$granted")
        promise.resolve(granted)
    }

    @ReactMethod
    fun openOverlayPermissionSettings(promise: Promise) {
        val packageName = reactApplicationContext.packageName
        Log.d(TAG, "openOverlayPermissionSettings:start package=$packageName")

        val intents = listOf(
            Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName")),
            Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION),
            Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:$packageName")),
        )

        val activity = reactApplicationContext.currentActivity

        intents.forEachIndexed { index, baseIntent ->
            val intent = baseIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            try {
                val canResolve = intent.resolveActivity(reactApplicationContext.packageManager) != null
                Log.d(TAG, "openOverlayPermissionSettings:attempt index=$index action=${intent.action} resolved=$canResolve")
                if (!canResolve) {
                    return@forEachIndexed
                }

                if (activity != null) {
                    activity.startActivity(intent)
                } else {
                    reactApplicationContext.startActivity(intent)
                }

                promise.resolve(true)
                return
            } catch (error: ActivityNotFoundException) {
                Log.e(TAG, "openOverlayPermissionSettings:activity-not-found index=$index", error)
            } catch (error: Exception) {
                Log.e(TAG, "openOverlayPermissionSettings:error index=$index", error)
            }
        }

        promise.reject("overlay_settings_unavailable", "Nao foi possivel abrir a tela de permissao de sobreposicao.")
    }

    @ReactMethod
    fun showFloatingTimer(promise: Promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactApplicationContext)) {
                promise.reject("overlay_permission_missing", "A permissao de sobreposicao ainda nao foi concedida.")
                return
            }

            FloatingTimerService.show(reactApplicationContext)
            promise.resolve(true)
        } catch (error: Exception) {
            Log.e(TAG, "showFloatingTimer:error", error)
            promise.reject("show_floating_timer_failed", error)
        }
    }

    @ReactMethod
    fun hideFloatingTimer(promise: Promise) {
        try {
            FloatingTimerService.hide(reactApplicationContext)
            promise.resolve(true)
        } catch (error: Exception) {
            Log.e(TAG, "hideFloatingTimer:error", error)
            promise.reject("hide_floating_timer_failed", error)
        }
    }

    @ReactMethod
    fun getFloatingTimerState(promise: Promise) {
        val map = Arguments.createMap().apply {
            putBoolean("visible", FloatingTimerStateStore.isOverlayVisible)
            putBoolean("running", FloatingTimerStateStore.isRunning)
            putDouble("elapsedMs", FloatingTimerStateStore.getElapsedMs().toDouble())
        }
        promise.resolve(map)
    }

    @ReactMethod
    fun getFloatingTimerAppearance(promise: Promise) {
        val map = Arguments.createMap().apply {
            putString("backgroundHex", FloatingTimerAppearanceStore.getBackgroundHex(reactApplicationContext))
            putString("textHex", FloatingTimerAppearanceStore.getTextHex(reactApplicationContext))
        }
        promise.resolve(map)
    }

    @ReactMethod
    fun setFloatingTimerAppearance(backgroundHex: String, textHex: String, promise: Promise) {
        try {
            FloatingTimerAppearanceStore.save(
                reactApplicationContext,
                backgroundHex,
                textHex,
            )
            FloatingTimerService.refreshAppearance()
            promise.resolve(true)
        } catch (error: Exception) {
            Log.e(TAG, "setFloatingTimerAppearance:error", error)
            promise.reject("set_floating_timer_appearance_failed", error)
        }
    }

    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}

    companion object {
        private const val TAG = "FloatingTimer"
    }
}
