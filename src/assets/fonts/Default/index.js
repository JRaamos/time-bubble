import * as Font from 'expo-font';

export const loadFonts = async () => {
  try {
      
    await Font.loadAsync({ 
      'Black': require('./Poppins-Black.ttf'),
      'ExtraBold': require('./Poppins-ExtraBold.ttf'),
      'Thin': require('./Poppins-Thin.ttf'),
      'ExtraLight': require('./Poppins-ExtraLight.ttf'),
      'SemiBold': require('./Poppins-SemiBold.ttf'),
      'Medium': require('./Poppins-Medium.ttf'),

      'Regular': require('./Poppins-Regular.ttf'),
      'Bold': require('./Poppins-Bold.ttf'), 
      'Light': require('./Poppins-Light.ttf')
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};