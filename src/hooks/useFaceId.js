import { useContext } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';
import { AuthContext } from '@context/AuthContext';

export function useFaceId(){
    
    const { faceId, setFaceId } = useContext(AuthContext)

    const askFaceId = async (credentials) => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
    
        if (!compatible || !enrolled) {
            console.log('Biometric authentication not available');
            return true;
        }
    
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autentique com Face ID',
            fallbackLabel: 'Informe o passcode',
        });
    
        if (result.success) {
            if(credentials) setFaceId(credentials)
            return true
        }

        return false
    };
  
    
    return {
        askFaceId,
        faceId
    }
}

