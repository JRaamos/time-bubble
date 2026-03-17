import * as Font from 'expo-font';

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Regular': require('./Poppins-Regular.ttf'),
      'Bold': require('./Poppins-Bold.ttf'),
    });

    return true;
  } catch (error) {
    if (__DEV__) {
      console.error('[Fonts] loadFonts:error', error);
    }
    return false;
  }
};
