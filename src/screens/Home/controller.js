import { useCallback, useEffect, useRef, useState } from 'react'
import { AppState, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'

import {
    getFloatingTimerAppearance,
    getFloatingTimerState,
    getOverlayPermissionStatus,
    hideFloatingTimer,
    openOverlayPermissionSettings,
    setFloatingTimerAppearance,
    setFloatingTimerFontKey,
    setFloatingTimerOpenOnAppLaunch,
    setFloatingTimerShowMilliseconds,
    showFloatingTimer,
    subscribeFloatingTimerState,
} from '@services/floatingTimer'

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

const formatElapsedTime = (elapsedMs, showMilliseconds) => {
    const minutes = Math.floor(elapsedMs / 60000)
    const seconds = Math.floor((elapsedMs % 60000) / 1000)

    if (!showMilliseconds) {
        return `${ String(minutes).padStart(2, '0') }:${ String(seconds).padStart(2, '0') }`
    }

    const milliseconds = Math.floor(elapsedMs % 1000)
    return `${ String(minutes).padStart(2, '0') }:${ String(seconds).padStart(2, '0') }.${ String(milliseconds).padStart(3, '0') }`
}

export const TIMER_FONT_OPTIONS = [
    {
        key: 'ds-digib',
        label: 'DS DIGIB',
        previewFont: 'monospace',
        previewSpacing: 1.2,
        previewValue: '12:34:56',
    },
    {
        key: 'ds-digii',
        label: 'DS DIGII',
        previewFont: 'monospace',
        previewSpacing: 1.8,
        previewValue: '12:34:56',
    },
    {
        key: 'ds-digit',
        label: 'DS DIGIT',
        previewFont: 'monospace',
        previewSpacing: 2.2,
        previewValue: '12:34:56',
    },
    {
        key: 'serif',
        label: 'Serif',
        previewFont: 'serif',
        previewSpacing: 0,
        previewValue: '12:34:56',
    },
    {
        key: 'sans-condensed',
        label: 'Sans Condensado',
        previewFont: 'sans-serif-condensed',
        previewSpacing: -0.4,
        previewValue: '12:34:56',
    },
    {
        key: 'sans-medium',
        label: 'Sans Medio',
        previewFont: 'sans-serif-medium',
        previewSpacing: 0,
        previewValue: '12:34:56',
    },
    {
        key: 'roboto-mono',
        label: 'Roboto Mono',
        previewFont: 'monospace',
        previewSpacing: 0.6,
        previewValue: '12:34:56',
    },
    {
        key: 'space-mono',
        label: 'Space Mono',
        previewFont: 'monospace',
        previewSpacing: 1,
        previewValue: '12:34:56',
    },
    {
        key: 'dm-mono',
        label: 'DM Mono',
        previewFont: 'monospace',
        previewSpacing: 0.2,
        previewValue: '12:34:56',
    },
]

export default function useController(){
    const appState = useRef(AppState.currentState)
    const autoOpenRequestedRef = useRef(false)
    const backgroundHexRef = useRef('#171C27')
    const textHexRef = useRef('#F9FBFF')
    const pixCopiedTimeout = useRef(null)

    const [loading, setLoading] = useState(true)
    const [busy, setBusy] = useState(false)
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [timerRunning, setTimerRunning] = useState(false)
    const [elapsedMs, setElapsedMs] = useState(0)
    const [backgroundHex, setBackgroundHex] = useState('#171C27')
    const [fontKey, setFontKey] = useState('ds-digib')
    const [openOnAppLaunch, setOpenOnAppLaunch] = useState(false)
    const [textHex, setTextHex] = useState('#F9FBFF')
    const [showMilliseconds, setShowMilliseconds] = useState(false)
    const [pixCopied, setPixCopied] = useState(false)

    useEffect(() => {
        backgroundHexRef.current = backgroundHex
    }, [backgroundHex])

    useEffect(() => {
        textHexRef.current = textHex
    }, [textHex])

    useEffect(() => {
        return () => {
            if (pixCopiedTimeout.current) {
                clearTimeout(pixCopiedTimeout.current)
            }
        }
    }, [])

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
        setFontKey(appearance?.fontKey || 'ds-digib')
        setOpenOnAppLaunch(!!appearance?.openOnAppLaunch)
        setTextHex(appearance?.textHex || '#F9FBFF')
        setShowMilliseconds(!!appearance?.showMilliseconds)
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
                autoOpenRequestedRef.current = false
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

    useEffect(() => {
        if (Platform.OS !== 'android' || !permissionGranted || !openOnAppLaunch) {
            autoOpenRequestedRef.current = false
            return
        }

        if (overlayVisible || autoOpenRequestedRef.current) {
            return
        }

        autoOpenRequestedRef.current = true

        showFloatingTimer()
            .catch(error => {
                debugError('autoOpenFloating:error', error)
            })
            .finally(() => {
                syncState()
            })
    }, [openOnAppLaunch, overlayVisible, permissionGranted, syncState])

    const handlePrimaryAction = async () => {
        if (Platform.OS !== 'android') {
            debugLog('handlePrimaryAction:skip-non-android')
            return
        }

        setBusy(true)

        try {
            debugLog('handlePrimaryAction:start')

            const hasOverlayPermission = await getOverlayPermissionStatus()
            debugLog('handlePrimaryAction:permission-check', {
                hasOverlayPermission,
            })

            if (!hasOverlayPermission) {
                await openOverlayPermissionSettings()
            } else {
                await showFloatingTimer()
            }
        } catch (error) {
            debugError('handlePrimaryAction:error', error)
        } finally {
            setBusy(false)
            syncState()
        }
    }

    const handleHideOverlay = async () => {
        setBusy(true)

        try {
            debugLog('handleHideOverlay:start')
            await hideFloatingTimer()
        } catch (error) {
            debugError('handleHideOverlay:error', error)
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
            debugError('handleCommitBackground:error', error)
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
            debugError('handleCommitText:error', error)
            syncState()
        }
    }

    const handleToggleMilliseconds = async value => {
        setShowMilliseconds(!!value)

        try {
            await setFloatingTimerShowMilliseconds(!!value)
        } catch (error) {
            debugError('handleToggleMilliseconds:error', error)
            syncState()
            return
        }

        syncState()
    }

    const handleSelectFont = async nextFontKey => {
        if (fontKey === nextFontKey) {
            return
        }

        setFontKey(nextFontKey)

        try {
            await setFloatingTimerFontKey(nextFontKey)
        } catch (error) {
            debugError('handleSelectFont:error', error)
            syncState()
            return
        }

        syncState()
    }

    const handleToggleOpenOnLaunch = async value => {
        setOpenOnAppLaunch(!!value)

        try {
            await setFloatingTimerOpenOnAppLaunch(!!value)
        } catch (error) {
            debugError('handleToggleOpenOnLaunch:error', error)
            syncState()
            return
        }

        syncState()
    }

    const handleCopyPixKey = async () => {
        try {
            await Clipboard.setStringAsync('3a10aa75-dd23-4fb2-8e70-099fb02fadf3')
            setPixCopied(true)

            if (pixCopiedTimeout.current) {
                clearTimeout(pixCopiedTimeout.current)
            }

            pixCopiedTimeout.current = setTimeout(() => {
                setPixCopied(false)
            }, 2200)
        } catch (error) {
            debugError('handleCopyPixKey:error', error)
        }
    }

    return {
        backgroundHex,
        busy,
        elapsedMs,
        fontKey,
        fontOptions: TIMER_FONT_OPTIONS,
        formattedElapsed: formatElapsedTime(elapsedMs, showMilliseconds),
        handleHideOverlay,
        handlePrimaryAction,
        handleCommitBackground,
        handleCommitText,
        handleCopyPixKey,
        handlePreviewBackground,
        handlePreviewText,
        handleSelectFont,
        handleToggleOpenOnLaunch,
        handleToggleMilliseconds,
        loading,
        openOnAppLaunch,
        overlayVisible,
        permissionGranted,
        platformIsAndroid: Platform.OS === 'android',
        pixCopied,
        pixPayload: '00020101021126580014br.gov.bcb.pix01363a10aa75-dd23-4fb2-8e70-099fb02fadf35204000053039865802BR5918JONATHAN R FEBRAIO6009TANQUINHO62070503***63040D84',
        pixKey: '3a10aa75-dd23-4fb2-8e70-099fb02fadf3',
        pixOwner: 'JONATHAN RAMOS FEBRAIO',
        showMilliseconds,
        textHex,
        timerRunning,
    }
}
