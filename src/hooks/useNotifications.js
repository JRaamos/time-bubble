import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useContext } from 'react';
import { Platform } from 'react-native';
import { ReadNotifications, SaveDeviceToken } from '@services/notifications';

import { CoreContext } from '@context/CoreContext'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function useExpoNotification() {
    const notificationListener = useRef();
    const responseListener = useRef();

    const { setNotifications } = useContext(CoreContext)

    const saveToken = async (token) => {
        if(token){
            const result = await SaveDeviceToken({
                token, os: Platform.OS
            })
            reloadNotifications()
        }
    }


    const dispatchLocal = async (title, body) => { 
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: { title, body },
            trigger: null
        });
        console.log('local dispatched',  notificationId );
    };

    const reloadNotifications = async () => { 
      const notifications = await ReadNotifications()
      setNotifications(notifications && notifications?.length ? notifications : [] )
    }
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => saveToken(token));
      
      notificationListener.current = Notifications.addNotificationReceivedListener(async notification => { 
        // app running
        reloadNotifications()
        if( notification?.request?.content && notification?.request?.trigger?.remoteMessage && Platform.OS === 'ios'){
          // dispatch to local when ios running 🥷
          dispatchLocal(notification?.request?.content?.title ?? '', notification?.request?.content?.body ?? '')
        }
      });
    
      responseListener.current = Notifications.addNotificationResponseReceivedListener(notification => { 
        // it seems never be fired
        console.log("notification", notification)
      });
  
      return () => {
        notificationListener?.current?.remove()
        responseListener?.current?.remove()
      };
    }, []);
  
    return null;
}
  
 

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications  
async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    } 
    if (Platform.OS === 'android' && ! __DEV__ ) {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 22, 156, 97],
        lightColor: '#5500B77C',
      });
    }
    return token;
}