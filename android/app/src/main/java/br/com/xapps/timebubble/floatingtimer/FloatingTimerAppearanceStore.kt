package br.com.xapps.timebubble.floatingtimer

import android.content.Context
import android.graphics.Color

object FloatingTimerAppearanceStore {
    private const val PREFERENCES_NAME = "floating_timer_preferences"
    private const val BACKGROUND_HEX_KEY = "background_hex"
    private const val TEXT_HEX_KEY = "text_hex"

    const val DEFAULT_BACKGROUND_HEX = "#171C27"
    const val DEFAULT_TEXT_HEX = "#F9FBFF"

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
        context
            .getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)
            .edit()
            .putString(BACKGROUND_HEX_KEY, normalizeBackgroundHex(backgroundHex))
            .putString(TEXT_HEX_KEY, normalizeTextHex(textHex))
            .apply()
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
