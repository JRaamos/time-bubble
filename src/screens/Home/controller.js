import { useCallback, useEffect, useRef, useState } from 'react'
import { AppState, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import {
    getFloatingTimerAppearance,
    getFloatingTimerState,
    getOverlayPermissionStatus,
    hideFloatingTimer,
    openOverlayPermissionSettings,
    setFloatingTimerAppearance,
    showFloatingTimer,
    subscribeFloatingTimerState,
} from '@services/floatingTimer'

const formatElapsedTime = elapsedMs => {
    const minutes = Math.floor(elapsedMs / 60000)
    const seconds = Math.floor((elapsedMs % 60000) / 1000)
    const milliseconds = Math.floor(elapsedMs % 1000)

    return `${ String(minutes).padStart(2, '0') }:${ String(seconds).padStart(2, '0') }.${ String(milliseconds).padStart(3, '0') }`
}

export default function useController(){
    const appState = useRef(AppState.currentState)
    const backgroundHexRef = useRef('#171C27')
    const textHexRef = useRef('#F9FBFF')

    const [loading, setLoading] = useState(true)
    const [busy, setBusy] = useState(false)
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [timerRunning, setTimerRunning] = useState(false)
    const [elapsedMs, setElapsedMs] = useState(0)
    const [backgroundHex, setBackgroundHex] = useState('#171C27')
    const [textHex, setTextHex] = useState('#F9FBFF')

    useEffect(() => {
        backgroundHexRef.current = backgroundHex
    }, [backgroundHex])

    useEffect(() => {
        textHexRef.current = textHex
    }, [textHex])

    const syncState = useCallback(async () => {
        if (Platform.OS !== 'android') {
            setLoading(false)
            return
        }

        const permission = await getOverlayPermissionStatus()
        const state = await getFloatingTimerState()
        const appearance = await getFloatingTimerAppearance()

        setPermissionGranted(!!permission)
        setOverlayVisible(!!state?.visible)
        setTimerRunning(!!state?.running)
        setElapsedMs(typeof state?.elapsedMs === 'number' ? state.elapsedMs : 0)
        setBackgroundHex(appearance?.backgroundHex || '#171C27')
        setTextHex(appearance?.textHex || '#F9FBFF')
        setLoading(false)
    }, [])

    useFocusEffect(useCallback(() => {
        syncState()
    }, [syncState]))

    useEffect(() => {
        const subscription = subscribeFloatingTimerState(state => {
            setOverlayVisible(!!state?.visible)
            setTimerRunning(!!state?.running)
            setElapsedMs(typeof state?.elapsedMs === 'number' ? state.elapsedMs : 0)
        })

        const appStateSubscription = AppState.addEventListener('change', nextAppState => {
            if ((appState.current === 'background' || appState.current === 'inactive') && nextAppState === 'active') {
                syncState()
            }

            appState.current = nextAppState
        })

        syncState()

        return () => {
            subscription?.remove?.()
            appStateSubscription.remove()
        }
    }, [syncState])

    const handlePrimaryAction = async () => {
        if (Platform.OS !== 'android') {
            console.log('[FloatingTimer] handlePrimaryAction skipped: non-android platform')
            return
        }

        setBusy(true)

        try {
            console.log('[FloatingTimer] handlePrimaryAction:start')

            const hasOverlayPermission = await getOverlayPermissionStatus()
            console.log('[FloatingTimer] handlePrimaryAction:permission-check', {
                hasOverlayPermission,
            })

            if (!hasOverlayPermission) {
                await openOverlayPermissionSettings()
            } else {
                await showFloatingTimer()
            }
        } catch (error) {
            console.error('[FloatingTimer] handlePrimaryAction:error', error)
        } finally {
            setBusy(false)
            syncState()
        }
    }

    const handleHideOverlay = async () => {
        setBusy(true)

        try {
            console.log('[FloatingTimer] handleHideOverlay:start')
            await hideFloatingTimer()
        } catch (error) {
            console.error('[FloatingTimer] handleHideOverlay:error', error)
        } finally {
            setBusy(false)
            syncState()
        }
    }

    const handlePreviewBackground = hex => {
        setBackgroundHex(hex)
    }

    const handleCommitBackground = async hex => {
        setBackgroundHex(hex)

        try {
            await setFloatingTimerAppearance(hex, textHexRef.current)
        } catch (error) {
            console.error('[FloatingTimer] handleCommitBackground:error', error)
            syncState()
        }
    }

    const handlePreviewText = hex => {
        setTextHex(hex)
    }

    const handleCommitText = async hex => {
        setTextHex(hex)

        try {
            await setFloatingTimerAppearance(backgroundHexRef.current, hex)
        } catch (error) {
            console.error('[FloatingTimer] handleCommitText:error', error)
            syncState()
        }
    }

    return {
        backgroundHex,
        busy,
        elapsedMs,
        formattedElapsed: formatElapsedTime(elapsedMs),
        handleHideOverlay,
        handlePrimaryAction,
        handleCommitBackground,
        handleCommitText,
        handlePreviewBackground,
        handlePreviewText,
        loading,
        overlayVisible,
        permissionGranted,
        platformIsAndroid: Platform.OS === 'android',
        textHex,
        timerRunning,
    }
}
