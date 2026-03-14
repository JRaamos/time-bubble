import styled from 'styled-components/native'     

import Icon from '@assets/icons'   

export const ContainerMany = styled.View.attrs({
})`            
    background-color: ${ props => props.theme.white };   
    border-color: ${ props => props.theme.black }; 
    elevation:1;  
    border-style: dashed;
    border-radius: 5px; 
    border-width: .5px;

    min-height: 180px; 
`;   

export const ContainerManyWrapper = styled.View.attrs({
})`            
    flex-direction: row;
    flex-wrap: wrap;
    padding: 12px 12px 0;
`;   

export const BigImage = styled.ImageBackground.attrs({
    resizeMode:'cover'
})`            
    background-color: ${ props => props.theme.white };   
    border-color: ${ props => props.theme.black }; 
    elevation:1;  
    border-style: dashed;
    border-radius: 5px; 
    border-width: .5px;

    min-height: 180px;
    position:relative;
`;   

export const BigImageContent = styled.View.attrs({
})`            
    background-color: ${ props => props.theme.white };   
    border-color: ${ props => props.theme.black }; 
    elevation:1;  
    border-style: dashed;
    border-radius: 5px; 
    border-width: .5px;

    min-height: 180px;
    position:relative;
`;   

export const RegularImage = styled.ImageBackground.attrs({
    resizeMode:'cover'
})`            
    background-color: ${ props => props.theme.white };   
    border-color: ${ props => props.theme.black }; 
    elevation:1;  
    border-style: dashed;
    border-radius: 5px; 
    border-width: .5px;

    height: 70px;
    width: 96px;
    position: relative;
    margin-right: 12px;
    margin-bottom: 12px;
`;    

export const ImagesContent = styled.View.attrs({
})`           
    margin-bottom: 32px;
    ${
        props => props.many ? `
            flex-wrap: wrap;
        ` : ``
    }
`;   

export const ImagesWrap = styled.View.attrs({
})`            
`;   

export const RegularImageIcon = styled(Icon).attrs(props => ({
    icon:'circleAdd',
    width: 24,
    height: 24,
    fill: props.theme.lightgrey
}))`            
    margin: auto;
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

export const InputPlaceholder = styled.Text.attrs({
})`    
    font-family: Regular;
    font-size: 16px;  
    color: ${ props => props.theme.black }; 
    text-align:center;
    margin: auto 0;
`;   



export const SelectedItemRemove = styled.TouchableOpacity.attrs({
})`    
    position:absolute;
    right: 0;
    width: 24px;
    height: 24px;
    border-radius: 16px;
    background-color: ${ props => props.theme.black };  
    align-items: center;
    justify-content: center;

    box-shadow: 0px 1px 1px ${ props => props.theme.lightshadow };    
    elevation: 1;
`;   

export const SelectedItemRemoveIcon = styled(Icon).attrs(props => ({
    icon: 'close',
    width: 18,
    height: 18,
    stroke: props.theme.white
}))`    
`;   

