import styled from 'styled-components/native'     

import Icon from '@assets/icons'   
import LottieView from 'lottie-react-native';    
import ConfettiCannon from 'react-native-confetti-cannon'; 
import { WindowScreen } from '@ui/styled';
 

export const ProfileContent = styled.View.attrs({
})`
    position: relative;
    margin: 12px auto 0;
`;  
export const ProfileImage = styled.ImageBackground.attrs({
})`
    width: 144px;
    height: 144px;
    border-radius: 72px;
    background: ${ props => props.theme.secondary };
    overflow: hidden;
    align-items: center;
    justify-content: center;
`;  
export const ProfileAction = styled.TouchableOpacity.attrs({
})`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background: ${ props => props.theme.secondary };
    position: absolute;
    bottom: 0px;
    right: 0px;

    elevation: 1;
    box-shadow: 0px 3px 6px ${props => props.theme.lightshadow };

    align-items: center;
    justify-content: center;
`;  
export const ProfileActionIcon = styled(Icon).attrs(props => ({
    icon: 'cam',
    width: 22,
    height: 22,
    stroke: props.theme.white
}))`
`;  

export const ProfileImageIcon =  styled(Icon).attrs(props => ({
    icon:'user',
    width: 58,
    height: 58,
    fill: props.theme.white
}))`
`;  

export const BodyText =  styled.Text.attrs(props => ({
}))`
    font-family: Regular;
    font-size: 12px;
    font-weight: 300;
    color: ${ props => props.theme.black };
    text-align: center;
    padding: 12px 0 24px;
    opacity: .4;
`;  