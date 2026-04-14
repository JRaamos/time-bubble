package br.com.jonathanfebraio.timebubble.floatingtimer

import android.content.Context
import android.graphics.Color

object FloatingTimerAppearanceStore {
    private const val PREFERENCES_NAME = "floating_timer_preferences"
    private const val BACKGROUND_HEX_KEY = "background_hex"
    private const val TEXT_HEX_KEY = "text_hex"
    private const val SHOW_MILLISECONDS_KEY = "show_milliseconds"
    private const val OPEN_ON_APP_LAUNCH_KEY = "open_on_app_launch"
    private const val FONT_KEY = "font_key"

    const val DEFAULT_BACKGROUND_HEX = "#171C27"
    const val DEFAULT_TEXT_HEX = "#F9FBFF"
    const val DEFAULT_SHOW_MILLISECONDS = false
    const val DEFAULT_OPEN_ON_APP_LAUNCH = false
    const val DEFAULT_FONT_KEY = "ds-digib"

    fun getBackgroundHex(context: Context): String {
        return context
            .getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)
            .getString(BACKGROUND_HEX_KEY, DEFAULT_BACKGROUND_HEX)
            ?.let(::normalizeBackgroundHex)
            ?: DEFAULT_BACKGROUND_HEX
    }

    fun getTextHex(context: Context): String {
        return context
            .getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)
            .getString(TEXT_HEX_KEY, DEFAULT_TEXT_HEX)
            ?.let(::normalizeTextHex)
            ?: DEFAULT_TEXT_HEX
    }

    fun save(context: Context, backgroundHex: String, textHex: String) {
        save(
            context,
            backgroundHex,
            textHex,
            getShowMilliseconds(context),
            getOpenOnAppLaunch(context),
            getFontKey(context),
        )
    }

    fun getShowMilliseconds(context: Context): Boolean {
        return context
            .getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)
            .getBoolean(SHOW_MILLISECONDS_KEY, DEFAULT_SHOW_MILLISECONDS)
    }

    fun getFontKey(context: Context): String {
        return context
            .getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)
            .getString(FONT_KEY, DEFAULT_FONT_KEY)
            ?.let(::normalizeFontKey)
            ?: DEFAULT_FONT_KEY
    }

    fun getOpenOnAppLaunch(context: Context): Boolean {
        return context
            .getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)
            .getBoolean(OPEN_ON_APP_LAUNCH_KEY, DEFAULT_OPEN_ON_APP_LAUNCH)
    }

    fun save(context: Context, backgroundHex: String, textHex: String, showMilliseconds: Boolean) {
        save(
            context,
            backgroundHex,
            textHex,
            showMilliseconds,
            getOpenOnAppLaunch(context),
            getFontKey(context),
        )
    }

    fun save(
        context: Context,
        backgroundHex: String,
        textHex: String,
        showMilliseconds: Boolean,
        openOnAppLaunch: Boolean,
        fontKey: String,
    ) {
        context
            .getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)
            .edit()
            .putString(BACKGROUND_HEX_KEY, normalizeBackgroundHex(backgroundHex))
            .putString(TEXT_HEX_KEY, normalizeTextHex(textHex))
            .putBoolean(SHOW_MILLISECONDS_KEY, showMilliseconds)
            .putBoolean(OPEN_ON_APP_LAUNCH_KEY, openOnAppLaunch)
            .putString(FONT_KEY, normalizeFontKey(fontKey))
            .commit()
    }

    fun resolveBackgroundColor(context: Context): Int {
        return Color.parseColor(getBackgroundHex(context))
    }

    fun resolveTextColor(context: Context): Int {
        return Color.parseColor(getTextHex(context))
    }

    fun normalizeBackgroundHex(input: String): String {
        val migrated = migrateLegacyToken(input)
        return if (isHexColor(migrated)) migrated.uppercase() else DEFAULT_BACKGROUND_HEX
    }

    fun normalizeTextHex(input: String): String {
        val migrated = migrateLegacyToken(input)
        return if (isHexColor(migrated)) migrated.uppercase() else DEFAULT_TEXT_HEX
    }

    fun normalizeFontKey(input: String): String {
        return when (input) {
            "ds-digib",
            "ds-digii",
            "ds-digit",
            "serif",
            "sans-condensed",
            "sans-medium",
            "roboto-mono",
            "space-mono",
            "dm-mono",
            -> input

            else -> DEFAULT_FONT_KEY
        }
    }

    private fun migrateLegacyToken(value: String): String {
        return when (value) {
            "timerPresetOcean" -> DEFAULT_BACKGROUND_HEX
            "timerPresetGraphite" -> "#262B33"
            "timerPresetForest" -> "#183127"
            "timerPresetSunset" -> "#3B2627"
            "timerTextIce" -> DEFAULT_TEXT_HEX
            "timerTextAmber" -> "#FFD37A"
            "timerTextMint" -> "#9EF2D8"
            "timerTextRose" -> "#FFC4D0"
            else -> value
        }
    }

    private fun isHexColor(value: String): Boolean {
        return Regex("^#[0-9A-Fa-f]{6}$").matches(value)
    }
}
