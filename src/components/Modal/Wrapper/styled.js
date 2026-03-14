import styled from 'styled-components/native'       

import Icon from '@assets/icons'
import * as Animatable from 'react-native-animatable'

import { 
    WindowScreen,
    headerHeightIOS
} from '@ui/styled'   
    
export const ModalContainer = styled(Animatable.View).attrs({
    animation: 'fadeIn',
    duration: 300
})`      
    position: absolute;
    background-color: ${ props => props.theme.shadow };   
    top: 0;
    bottom: 0;
    right: 0;
    left: 0; 
`; 

export const ModalFader = styled.TouchableOpacity.attrs({
})`              
    padding: 20px;
    flex:1;
`; 

export const ModalBody = styled(Animatable.View).attrs({
    animation: 'fadeInUpBig',
    delay: 300,
    duration: 300
})`         
    background: ${ props => props.theme.white };    
    padding: 24px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    overflow: hidden;
`;    



export const RowHeader = styled.View.attrs({
})`          
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
`;    

export const HeaderItem = styled.View.attrs({
})`          
    width: 24px;
`;    

export const HeaderTitle = styled.Text.attrs({
})`          
    font-size: 20px;
    font-family: Bold;
    color: ${ props => props.theme.black };
    text-align: center;
    flex:1;
`;    

export const HeaderClose = styled.TouchableOpacity.attrs({
})`          
`;    

export const HeaderCloseIcon = styled(Icon).attrs(props => ({
    icon:'close',
    stroke: props.theme.black,
    width: 24,
    height: 24
}))`          
`;    




export const MenuContent = styled.View.attrs({
})`          
    padding: 30px 0 ${ headerHeightIOS+30 }px;
`;    
    
export const MenuItem = styled.TouchableOpacity.attrs({
})`          
    padding: 20px 8px;
    border-bottom-width: .5px;
    border-bottom-color: ${ props => props.theme.lightgrey };
    flex-direction: row;
    align-items: center;
`; 
    
export const HeaderTitleContent = styled.View.attrs({
})`          
    flex-direction: row;
    align-items: center;
    flex:1;
`; 

export const HeaderTitleIcon = styled(Icon).attrs(props => ({
    stroke: props.theme.black,
    width: 24,
    height: 24
}))`       
    margin-left: 10px;
`; 