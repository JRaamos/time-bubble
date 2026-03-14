import { useCallback, useEffect, useRef, useState } from 'react'
import { AppState, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import {
    getFloatingTimerState,
    getOverlayPermissionStatus,
    hideFloatingTimer,
    openOverlayPermissionSettings,
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

    const [loading, setLoading] = useState(true)
    const [busy, setBusy] = useState(false)
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [timerRunning, setTimerRunning] = useState(false)
    const [elapsedMs, setElapsedMs] = useState(0)

    const syncState = useCallback(async () => {
        if (Platform.OS !== 'android') {
            setLoading(false)
            return
        }

        const permission = await getOverlayPermissionStatus()
        const state = await getFloatingTimerState()

        setPermissionGranted(!!permission)
        setOverlayVisible(!!state?.visible)
        setTimerRunning(!!state?.running)
        setElapsedMs(typeof state?.elapsedMs === 'number' ? state.elapsedMs : 0)
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

    return {
        busy,
        elapsedMs,
        formattedElapsed: formatElapsedTime(elapsedMs),
        handleHideOverlay,
        handlePrimaryAction,
        loading,
        overlayVisible,
        permissionGranted,
        platformIsAndroid: Platform.OS === 'android',
        timerRunning,
    }
}
