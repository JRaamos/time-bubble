import React, { useContext } from 'react'  
import { StatusBar } from 'expo-status-bar'; 
import { 
    ContainerImage, 
    ContainerWhite
} from './styled'  

import { 
    Safe 
} from '@ui/styled'  

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { CoreContext } from '@context/CoreContext';
 
export default function ContainerWrapper(props){
 
    // const { currentTheme } = useContext(CoreContext)

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