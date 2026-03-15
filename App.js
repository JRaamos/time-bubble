import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeContext } from '@ui/themes/context';
import { loadFonts } from '@assets/fonts/Default';
import Router from '@router';
import { navigationRef } from '@router/root';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initApplication = async () => {
      try {
        await loadFonts();
      } finally {
        if (mounted) {
          setLoading(false);
        }
        SplashScreen.hideAsync().catch(() => {});
      }
    };

    initApplication();

    return () => {
      mounted = false;
    };
  }, []);

  return loading ? null : (
    <NavigationContainer ref={navigationRef}>
      <ThemeContext>
        <Router />
      </ThemeContext>
    </NavigationContainer>
  );
}
