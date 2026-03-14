import { useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native'

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as mapping } from './mapping.json'; 
import { default as theme } from './theme.json'; 

import { CoreContext } from '@context/CoreContext'; 

import { day } from './day'
import { night } from './night' 

export function ThemeContext({ children }){

    const colorScheme = `light`
    const currentTheme = day
    // const colorScheme = useColorScheme()
    // const { currentTheme, setCurrentTheme, darkmode } = useContext(CoreContext)

    // useEffect(() => {
    //     if(darkmode !== null){
    //         setCurrentTheme( !darkmode ? night : day )
    //     }else{
    //         setCurrentTheme( colorScheme === 'dark' ? night : day )
    //     }
    // }, [colorScheme, darkmode])

    return (
        <>
             <ApplicationProvider {...eva} theme={{ ...eva[colorScheme], ...theme }} customMapping={mapping}>
                <ThemeProvider theme={currentTheme}>
                    { children }
                </ThemeProvider>
             </ApplicationProvider>
        </>
    )
} 