import { useState, useEffect } from "react"; 
import Toast from "react-native-toast-message"; 

import * as Location from 'expo-location'; 

export default function useGeolocation() { 

  const [location, setLocation] = useState(null);
  const [granted, setGranted] = useState(true); 

  const askGettingLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Toast.show({ type: 'error', text1: 'Permissão para acessar localização negada' })
        return;
    }
    return await Location.getCurrentPositionAsync({});
  }
 
  const init = async () => { 
      const userLocation = await askGettingLocation()
      setGranted(!!userLocation)
      setLocation(userLocation?.coords)
  } 

  useEffect(() => { init() ;}, []);

  return {
    location,
    granted
  }
}
