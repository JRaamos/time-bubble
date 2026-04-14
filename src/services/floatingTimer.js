import { NativeEventEmitter, NativeModules, Platform } from 'react-native'

const fallbackState = {
    elapsedMs: 0,
    running: false,
    visible: false,
}

const fallbackAppearance = {
    backgroundHex: '#171C27',
    fontKey: 'ds-digib',
    openOnAppLaunch: false,
    textHex: '#F9FBFF',
    showMilliseconds: false,
}

const floatingTimerModule = NativeModules.FloatingTimerModule
const floatingTimerEmitter = Platform.OS === 'android' && floatingTimerModule ? new NativeEventEmitter(floatingTimerModule) : null
const logPrefix = '[FloatingTimer]'

const debugLog = (event, payload) => {
    if (__DEV__) {
        console.log(`${logPrefix} ${event}`, payload)
    }
}

const debugError = (event, error) => {
    if (__DEV__) {
        console.error(`${logPrefix} ${event}`, error)
    }
}

export const getOverlayPermissionStatus = async () => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.getOverlayPermissionStatus) {
        debugLog('getOverlayPermissionStatus:unavailable', {
            platform: Platform.OS,
            hasModule: !!floatingTimerModule,
        })
        return false
    }

    const result = await floatingTimerModule.getOverlayPermissionStatus()
    debugLog('getOverlayPermissionStatus:success', { result })
    return result
}

export const openOverlayPermissionSettings = async () => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.openOverlayPermissionSettings) {
        debugLog('openOverlayPermissionSettings:unavailable', {
            platform: Platform.OS,
            hasModule: !!floatingTimerModule,
        })
        return
    }

    debugLog('openOverlayPermissionSettings:start')

    try {
        const result = await floatingTimerModule.openOverlayPermissionSettings()
        debugLog('openOverlayPermissionSettings:success', { result })
        return result
    } catch (error) {
        debugError('openOverlayPermissionSettings:error', error)
        throw error
    }
}

export const showFloatingTimer = async () => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.showFloatingTimer) {
        debugLog('showFloatingTimer:unavailable', {
            platform: Platform.OS,
            hasModule: !!floatingTimerModule,
        })
        return
    }

    debugLog('showFloatingTimer:start')
    return floatingTimerModule.showFloatingTimer()
}

export const hideFloatingTimer = async () => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.hideFloatingTimer) {
        debugLog('hideFloatingTimer:unavailable', {
            platform: Platform.OS,
            hasModule: !!floatingTimerModule,
        })
        return
    }

    debugLog('hideFloatingTimer:start')
    return floatingTimerModule.hideFloatingTimer()
}

export const getFloatingTimerState = async () => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.getFloatingTimerState) {
        return fallbackState
    }

    const state = await floatingTimerModule.getFloatingTimerState()

    return {
        elapsedMs: typeof state?.elapsedMs === 'number' ? state.elapsedMs : 0,
        running: !!state?.running,
        visible: !!state?.visible,
    }
}

export const getFloatingTimerAppearance = async () => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.getFloatingTimerAppearance) {
        return fallbackAppearance
    }

    const appearance = await floatingTimerModule.getFloatingTimerAppearance()

    return {
        backgroundHex: appearance?.backgroundHex || fallbackAppearance.backgroundHex,
        fontKey: appearance?.fontKey || fallbackAppearance.fontKey,
        openOnAppLaunch: !!appearance?.openOnAppLaunch,
        textHex: appearance?.textHex || fallbackAppearance.textHex,
        showMilliseconds: !!appearance?.showMilliseconds,
    }
}

export const setFloatingTimerAppearance = async (backgroundHex, textHex) => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.setFloatingTimerAppearance) {
        debugLog('setFloatingTimerAppearance:unavailable', {
            platform: Platform.OS,
            hasModule: !!floatingTimerModule,
        })
        return
    }

    debugLog('setFloatingTimerAppearance:start', {
        backgroundHex,
        textHex,
    })

    return floatingTimerModule.setFloatingTimerAppearance(backgroundHex, textHex)
}

export const setFloatingTimerShowMilliseconds = async showMilliseconds => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.setFloatingTimerShowMilliseconds) {
        debugLog('setFloatingTimerShowMilliseconds:unavailable', {
            platform: Platform.OS,
            hasModule: !!floatingTimerModule,
        })
        return
    }

    debugLog('setFloatingTimerShowMilliseconds:start', {
        showMilliseconds,
    })

    return floatingTimerModule.setFloatingTimerShowMilliseconds(!!showMilliseconds)
}

export const setFloatingTimerFontKey = async fontKey => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.setFloatingTimerFontKey) {
        debugLog('setFloatingTimerFontKey:unavailable', {
            platform: Platform.OS,
            hasModule: !!floatingTimerModule,
        })
        return
    }

    debugLog('setFloatingTimerFontKey:start', {
        fontKey,
    })

    return floatingTimerModule.setFloatingTimerFontKey(fontKey)
}

export const setFloatingTimerOpenOnAppLaunch = async openOnAppLaunch => {
    if (Platform.OS !== 'android' || !floatingTimerModule?.setFloatingTimerOpenOnAppLaunch) {
        debugLog('setFloatingTimerOpenOnAppLaunch:unavailable', {
            platform: Platform.OS,
            hasModule: !!floatingTimerModule,
        })
        return
    }

    debugLog('setFloatingTimerOpenOnAppLaunch:start', {
        openOnAppLaunch,
    })

    return floatingTimerModule.setFloatingTimerOpenOnAppLaunch(!!openOnAppLaunch)
}

export const subscribeFloatingTimerState = listener => {
    if (!floatingTimerEmitter) {
        return {
            remove: () => { },
        }
    }

    return floatingTimerEmitter.addListener('floatingTimerStateChanged', listener)
}
