import styled from 'styled-components/native'     
 
import Icon from '@assets/icons' 

export const HeaderContainer = styled.View.attrs({
})`  
    display: flex;
    margin: 0px 12px;   
    border-bottom-width: .5px;
    border-bottom-color: ${ props => props.theme.lightshadow };
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;    
export const HeaderItem = styled.TouchableOpacity.attrs({
})`     
    height: 48px;
    width: 40px;
    align-items: center;
    justify-content: center; 
`;   
export const HeaderTitle = styled.Text.attrs({
})`            
    font-family: Bold;
    font-size: 18px; 
    color: ${props => props.theme.black};    
`;    
export const BackIcon = styled(Icon).attrs(props => ({
    width: 9,
    height: 18,
    icon:'chevron',
    stroke: props.theme.black,
    fill: props.theme.black
}))`     
`;     
export const MenuIcon = styled(Icon).attrs(props => ({
    width: 24,
    height: 24,
    icon:'hamburger',
    stroke: props.theme.black
}))`     
`;    

export const HeaderIcon = styled.ImageBackground.attrs({
    source: require('@assets/images/icon.png')
})`            
    width: 40px;
    height: 40px;
    margin: 0 0 10px 0px;
`;   

export const SkipItem = styled.TouchableOpacity.attrs({
})`          
`;   


export const SkipItemText = styled.Text.attrs({
})`            
    font-family: Regular;
    font-size: 16px; 
    color: ${props => props.theme.grey};    
`;   

export const CloseIcon = styled(Icon).attrs(props => ({
    width: 24,
    height: 24,
    icon:'close',
    stroke: props.theme.primary
}))`     
`;    