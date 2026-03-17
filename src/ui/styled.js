import styled from 'styled-components/native'
import { Dimensions, Platform, StatusBar } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Constants from 'expo-constants';

export const WindowScreen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    landscape: ( Dimensions.get('window').width > Dimensions.get('window').height )
}

// HEADERS
/* will be DEPRECATED in favor of insets from react-native-safe-area-context */
export const headerHeightAndroid = Platform.OS === 'android' && StatusBar.currentHeight != 24 ? (StatusBar.currentHeight + 8) : StatusBar.currentHeight
export const headerHeightIOS = getStatusBarHeight()

const variantHeightIOS = (( 
    Constants.statusBarHeight !== 20
) ? ( headerHeightIOS + 8 ) : 0 )


export const headerHeight = ( 
    Platform.OS === 'android' ? 
        headerHeightAndroid 
    : ( headerHeightIOS + variantHeightIOS )
)

export const Safe = styled.View.attrs( props => ({ 
}))`
    padding-top: ${props => typeof props?.insets?.top === 'number' ?  props?.insets?.top  : headerHeight  }px;
    ${
        props => Platform.OS === 'android' ? `
            padding-bottom: ${ typeof props?.insets?.bottom === 'number' ?  props?.insets?.bottom  : 0  }px;
        ` : ``
    }
`;

export const Scroll = styled.ScrollView.attrs( props => ({ 
    showsVerticalScrollIndicator:false
}))`     
    ${ props => props.backgrounded ? `
        background: ${ props.theme.background };
    ` : ``}
`;
