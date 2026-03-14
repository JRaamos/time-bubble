import { Asset } from 'expo-asset';

export const loadImages = async () => {
  try {
      
    await Asset.loadAsync([
      require('@assets/images/icon.png'),
      require('@assets/images/splash.png')
    ])

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};