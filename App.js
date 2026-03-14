
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import * as SplashScreen from 'expo-splash-screen'

import { ThemeContext } from '@ui/themes/context'; 
import { loadFonts } from '@assets/fonts/Default'
import { loadImages } from '@assets/images'

import Router from '@router'
import { navigationRef } from '@router/root';

import AppContext from '@context'
import ModalController from '@components/Modal/Controller'
import { LogBox } from 'react-native';

const originalWarn = console.error;
console.error = (...args) => {
  if ( typeof args[0] === 'string' && args[0].indexOf('Invalid prop `style` supplied to `React.Fragment`') !== -1 ) {
    return; // ignora
  }
  originalWarn(...args);
};

LogBox.ignoreAllLogs(true)
export default function App() { 
    const [loading, setLoading] = useState(true)

    const initApplication = async () => {
      SplashScreen.preventAutoHideAsync(); 
        await loadImages() 
        await loadFonts() 
        setLoading(false)
      SplashScreen.hideAsync();
    }

    useEffect(() => {
      initApplication()
    },[]);

  return loading ? null : (  
    <NavigationContainer ref={navigationRef}>
        <AppContext>
            <ThemeContext> 
              <Router />
              <ModalController />
              <Toast />
            </ThemeContext>
        </AppContext>
    </NavigationContainer>  
  );
}