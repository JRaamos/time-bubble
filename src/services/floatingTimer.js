import { NativeEventEmitter, NativeModules, Platform } from 'react-native'

const fallbackState = {
    elapsedMs: 0,
    running: false,
    visible: false,
}

const fallbackAppearance = {
    backgroundHex: '#171C27',
    textHex: '#F9FBFF',
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
        textHex: appearance?.textHex || fallbackAppearance.textHex,
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

export const subscribeFloatingTimerState = listener => {
    if (!floatingTimerEmitter) {
        return {
            remove: () => {},
        }
    }

    return floatingTimerEmitter.addListener('floatingTimerStateChanged', listener)
}
