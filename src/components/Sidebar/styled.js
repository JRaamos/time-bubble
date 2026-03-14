import styled from 'styled-components/native'     
import * as Animatable from 'react-native-animatable';
 
import Icon from '@assets/icons'   

export const Container = styled.View.attrs({
})`   
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; 
    flex-direction: row;
    background-color: ${ props => props.theme.shadow };
`;     

export const ContentSide = styled(Animatable.View).attrs({
    animation:'slideInLeft',
    duration: 300
})`            
    background-color: ${ props => props.theme.white };
    flex:1;
    flex-direction: row;
`;     

export const SideTop = styled.View.attrs({
})`   
    padding: 0px 20px;
`;  

export const SideBody = styled.View.attrs({
})`   
    min-width: 100%; 
    flex:1;
`;     

export const SideItem = styled.TouchableOpacity.attrs({
})`   
    padding: 20px 10px;
    margin: 0px 10px;
    border-bottom-width: .3px;
    border-bottom-color: ${ props => props.theme.lightshadow };
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;     

export const SideItemIcon = styled(Icon).attrs( props => ({
    icon:'chevron',
    width: 9,
    height: 14,
    stroke: props.theme.black,
    fill: props.theme.black
}))`    
    transform: rotate(180deg);
`;     

export const SideItemText = styled.Text.attrs({
})`    
    font-family: Light;
    font-size: 16px; 
    color: ${ props => props.theme.black };
`;     

export const SideFooter = styled.View.attrs({
})`   
    padding: 20px;
`;     

export const SideFooterVersion = styled.Text.attrs({
})`   
    text-align: center;
    font-family: Light;
    font-size: 14px; 
    color: ${props => props.theme.black};  
    ${
        props => props.spaced ? `
            margin-top:20px;
        ` : ``
    }
`;     

export const AnimationContentClose = styled(Animatable.View).attrs({
    animation:'fadeIn',
    delay: 150,
    duration: 300
})`            
    width: 20%;
    flex-direction: row;
`;  

export const ContentClose = styled.TouchableOpacity.attrs({
})`   
    background-color: ${ props => props.theme.shadow };
    width: 100%;
`;     

export const ThemeIcon = styled(Icon).attrs(props => ({
    icon: props.night ? 'moon' : 'sun',
    width: 16,
    height: 16,
    fill: props.theme.black
}))`    
`;     