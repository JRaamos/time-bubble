
import * as ImagePicker from 'expo-image-picker';
import { ServerUploadImage } from '@services/api'

export const PickImage = async () => {
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const uploaded = await ServerUploadImage(result.assets[0].uri);
            return uploaded;
        }
    } catch (err) { }
}