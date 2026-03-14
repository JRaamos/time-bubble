import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { navigate } from './root'

import Splash from '@screens/Splash'; 
import Home from '@screens/Home'; 
import Me from '@screens/Me'; 

import Onboard from '@screens/Onboard'; 

import Login from '@screens/Authentication/Login'; 
import Forgot from '@screens/Authentication/Forgot'; 
import Register from '@screens/Authentication/Register'; 
import CreatePassword from '@screens/Authentication/CreatePassword'; 


import useDeeplink from '@hooks/useDeeplink';

const Stack = createStackNavigator();

export default function Router() {

  useDeeplink()

  return (
    <Stack.Navigator screenOptions={{ headerShown:false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />   
      <Stack.Screen name="Home" component={Home} />   
      <Stack.Screen name="Me" component={Me} />   
      

      <Stack.Screen name="Onboard" component={Onboard} />   

      <Stack.Screen name="Login" component={Login} />   
      <Stack.Screen name="Forgot" component={Forgot} />   
      <Stack.Screen name="Register" component={Register} />   
      <Stack.Screen name="CreatePassword" component={CreatePassword} />   

      
      
    </Stack.Navigator>
  );
}