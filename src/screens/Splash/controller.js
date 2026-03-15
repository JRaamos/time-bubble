import { useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

export default function useController() {

    const { navigate } = useNavigation()

    useFocusEffect(useCallback(() => {
        const timer = setTimeout(() => { navigate('Home'); }, 900)
        return () => { clearTimeout(timer); }
    }, []))

    return {

    }
}