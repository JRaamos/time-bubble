import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeContext } from '@ui/themes/context';
import { loadFonts } from '@assets/fonts/Default';
import LaunchSplash from '@components/LaunchSplash';
import Router from '@router';
import { navigationRef } from '@router/root';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [navigationReady, setNavigationReady] = useState(false);
  const [showLaunchSplash, setShowLaunchSplash] = useState(true);
  const splashOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let mounted = true;

    const initApplication = async () => {
      try {
        await loadFonts();
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initApplication();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading || !navigationReady) {
      return;
    }

    SplashScreen.hideAsync().catch(() => {});

    Animated.timing(splashOpacity, {
      toValue: 0,
      duration: 260,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setShowLaunchSplash(false);
      }
    });
  }, [loading, navigationReady, splashOpacity]);

  return loading ? null : (
    <ThemeContext>
      <NavigationContainer ref={navigationRef} onReady={() => setNavigationReady(true)}>
        <Router />
        {showLaunchSplash ? <LaunchSplash opacity={splashOpacity} /> : null}
      </NavigationContainer>
    </ThemeContext>
  );
}
