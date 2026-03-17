import React from 'react'  
import { StatusBar } from 'expo-status-bar'; 
import { 
    ContainerWhite
} from './styled'  

import { 
    Safe 
} from '@ui/styled'  

import { useSafeAreaInsets } from 'react-native-safe-area-context';
 
export default function ContainerWrapper(props){
    const insets = useSafeAreaInsets();

    return (
        <>  
            <StatusBar style={'light'} />
            <ContainerWhite>
                <Safe insets={insets}>
                    { props?.children }
                </Safe>
            </ContainerWhite> 
        </>
    )
}
