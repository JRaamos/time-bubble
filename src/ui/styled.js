import styled from 'styled-components/native'     
 
import Icon from '@assets/icons'   
import * as Animatable from 'react-native-animatable';

import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions, StatusBar, Platform } from 'react-native' 
import LottieView from 'lottie-react-native';    

import * as Device from 'expo-device'; 
import Constants from 'expo-constants';
import icons from '@assets/icons';

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
/* END future DEPRECATION */

export const hexToRgb = (hex) => {
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length === 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255].join(',') ;
    }
    return `255,255,255`
}

export const alphaColor = (color, alpha) => {
    return `rgba( ${hexToRgb( Colors?.[color] || Colors?.['primary'] )}, .${ alpha ? alpha : 1 })`
}

export const getFontSize = size => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
}

export const Load = styled.ActivityIndicator.attrs( props => ({ 
    color: props.white ? props.theme.white : props.color ? props.color : props.theme.primary
}))`     
`;

export const LoadCenter = styled.View.attrs({ 
})`         
    width: 20px;
    margin: 32px auto; 
    flex-direction: row;
    justify-content: center;
`;

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

export const Touch = styled.TouchableOpacity.attrs( props => ({ 
}))`     
`;

export const HorizontalScroll = styled.ScrollView.attrs( props => ({ 
    horizontal: true,
    showsHorizontalScrollIndicator:false
}))`     
`;

export const ProjectIconSVG = styled(Icon).attrs({
    icon: 'logo',
    width: 70,
    height: 70
})`            
    margin: 18px auto 36px;
`;   

export const ProjectIcon = styled.ImageBackground.attrs({
    source:require('@assets/images/icon.png')
})`            
    width: 100px;
    height: 100px;
    margin: 18px 0 36px;
    ${
        p => p.centred ? `
            margin: 18px auto 36px;
        ` : ``
    }
`;   

export const Content = styled.View.attrs({
})`            
    padding: 18px 12px;
`;   

export const FormContent = styled.View.attrs({
})`            
    margin: 12px 0;
`;   

export const Title = styled.Text.attrs({
})`            
    font-family: Bold;
    font-size: 18px;  
    color: ${ props => props.theme.primary }; 
    margin-bottom: 16px;
    ${
        props => props.centred ? `
            text-align: center;
        ` : ``
    }
`;    

export const Text = styled.Text.attrs({
})`            
    font-family: Regular;
    font-size: 16px;  
    line-height: 26px;  
    color: ${ props => props.theme.black }; 
    margin-bottom: 32px;
    ${
        props => props.centred ? `
            text-align: center;
        ` : ``
    }
`;    


export const BodyAnimation = styled(LottieView).attrs({
    autoPlay: true,
    loop: true 
})`            
    width: 200px;
    height: 140px;
    margin: 0 auto 20px;
`;   

export const BounceIn = styled(Animatable.View).attrs({
    animation:'bounceIn'
})`             
`;   


export const ContentSpacer = styled.View.attrs({
})`            
    flex:1;
`;

export const DashboardActions = styled.View.attrs({
})`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 12px;
    ${p => p.start ? `
            justify-content: flex-start;
        ` : ``
    }
    ${p => p.between ? `
            justify-content: space-between;
        ` : ``
    }
`;


export const DashboardActionsItem = styled.View.attrs({
})`
    ${
        p => p.big ? `
            flex: 1;
        ` : ``
    }
    margin-bottom: 12px;
`;

export const TableContentImage = styled(icons).attrs({
    icon: 'trash',
    stroke: 'red',
    width: 20
})`

`;

export const ButtonContainer = styled.View.attrs({
})`
    display: flex;
    flex-direction: row;
    ${p => p.column ? `
        flex-direction: column;
        ${ p.start ? `align-items: flex-start;` : ``}
        ${ p.center ? `align-items: center;` : ``}
        ${ p.end ? `align-items: flex-end;` : ``}
    ` : ``};    

    justify-content: space-between;
    ${ p => p.start ? `justify-content: flex-start;` : ``}
    ${ p => p.center ? `justify-content: center;` : ``}
    ${ p => p.end ? `justify-content: flex-end;` : ``}

    width: 100%;
    ${p => p.space ? `gap: 24px` : ``}
`;

export const EmptyMessage = styled.Text.attrs({ 
})`         
    padding: 32px; 
    text-align: center;
    font-family: Regular;
    font-size: 14px;
    color: ${ props => props.theme.black };
`;