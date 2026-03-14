import styled from 'styled-components/native'    
 

import Icon from '@assets/icons'

export const ContainerInput = styled.View.attrs({
})`
`;
 
export const InputLabel = styled.Text.attrs({
})`             
    padding: 0 6px;
    color: ${ props => props.theme.black };
    margin: 0 0 10px 0;

    text-transform: capitalize;
    font-family: Regular;
    font-size: 13px;  
`;  

export const InputContent = styled.View.attrs({
})`        
    border-width: .5px;
    border-color: ${ props => props.theme.lightgrey }; 

    border-radius: 5px; 
    background-color: ${ props => props.theme.white };
    ${
        props => props.purple ? `
            border-color: ${ props.theme.lightgrey };
        ` : ``
    }
`;  

export const InputContentHeader = styled.TouchableOpacity.attrs({
})`       
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    padding: 0 16px 0 0;
`;  

export const InputContentHeaderInput = styled.View.attrs({
})`       
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    padding: 0 16px 0 0;
`;  

export const InputInput = styled.TextInput.attrs(props => ({
    placeholderTextColor: props.theme.lightgrey
}))`       
    height: 48px;
    flex:1;
    padding: 0 0 0 16px;
    font-family: Regular;
    font-size: 16px;
    color:${ props => props.theme.black };
`;  
 

export const InputInputSelect = styled.Text.attrs({
})`       
    color: ${ props => props.theme.grey };
    font-size: 14px;
    font-family: Regular; 
    padding: 0 16px;
    flex:1;
    ${
        props => props.purple ? `
            color: ${ props.theme.black };
            font-size: 16px;
        ` : ``
    }
`;

export const InputIcon = styled(Icon).attrs(props => ({
    icon: 'chevron',
    width: 8,
    height: 16,
    fill: props.theme.lightgrey
}))`       
    transform: rotate(-90deg);
`;  

export const SearchIcon = styled(Icon).attrs({
    icon: 'search',
    width: 16,
    height: 16 
})`       
`;  

export const InputTextDecoration = styled.Text.attrs({
})`       
    color: ${ props => props.theme.grey };
    font-size: 14px;
    font-family: Regular;
`;  

export const InputSearchContent = styled.View.attrs({
})`       
    margin: 14px 0 14px 14px;
    border-width: .5px;
    border-color: ${ props => props.theme.lightgrey };
    border-radius: 5px; 
    flex:1;
    flex-direction: row;
    align-items: center;
    padding: 0 16px 0 0;
`;  
 
export const InputContentOptions = styled.ScrollView.attrs({
    contentContainerStyle:{
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    showsVerticalScrollIndicator: true,
    nestedScrollEnabled: true
})`     
    max-height: 160px;
    margin-bottom: 16px;
`;  

export const Option = styled.TouchableOpacity.attrs({
})`        
    height: 40px;
    justify-content: center;
`;  

export const OptionText = styled.Text.attrs({
})`        
    font-size: 16px;
    font-family: Regular;
    color: ${ props => props.theme.grey };
`;    