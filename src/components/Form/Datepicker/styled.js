import styled from 'styled-components/native'     
import { TextInputMask } from 'react-native-masked-text'
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from '@assets/icons' 

export const InputContainer = styled.View.attrs({
})`    
    background: ${ props => props.theme.white };    
    border-radius: 5px;     
    border-width: .5px;
    border-color: ${ props => props.theme.black };
    elevation:1;  
    margin-bottom: 32px;
    position: relative;
`;   

export const InputLabel = styled.Text.attrs({
})`             
    padding: 0 6px;
    color: ${ props => props.theme.black };
    margin: 0 0 10px 0;

    text-transform: capitalize;
    font-family: Regular;
    font-size: 14px;  
`;  
 
export const InputInput = styled.TextInput.attrs(props => ({
    placeholderTextColor: props.theme.grey,
    multiline: !!props.textarea
}))`          
    background: ${ props => props.theme.white };   
    height: 40px;
    border-radius: 5px;

    font-family: Regular;
    color: ${ props => props.theme.grey };
    font-size: 14px;
    
    padding: 0 8px;
    ${
        props => props.textarea ? `
            height: 130px;
            padding: 8px;
        ` : ``
    }

`;    

export const InputMask = styled(TextInputMask).attrs(props => ({
    placeholderTextColor: props.theme.grey,
    type: props.mask
}))`          
    background: ${ props => props.theme.white };   
    height: 40px;
    border-radius: 5px;

    font-family: Regular;
    color: ${ props => props.theme.grey };
    font-size: 14px;

    padding: 0 8px;
`;    
  
export const CopyableContent = styled.View.attrs({
})`      
    flex-direction: row;
    align-items: center;
`;   

export const InputOut = styled.View.attrs({
})`      
    flex: 1;
`;   

export const ButtonCopy = styled.TouchableOpacity.attrs({
})`       
    padding: 12px 8px;
    flex-direction: row;
    align-items: center;
`;    

export const ButtonCalendar = styled(Icon).attrs(props => ({
    stroke: props.theme.black,
    icon: props.type === 'time' ? 'clock' : props.type === 'datetime' ? 'calendarClock' : 'calendar',
    width: 24,
    height: 24
}))`      
    margin-left: 8px;
`;   

export const CalendarCalendar = styled(DateTimePicker).attrs(props => ({
    themeVariant: props.theme.white === '#ffffff' ? "light" : "dark",
    is24Hour: true,
    display:"default"
}))`      
`;   