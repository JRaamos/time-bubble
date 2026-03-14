import styled from 'styled-components/native'     

import Icon from '@assets/icons' 

export const ListItemContent = styled.View.attrs({
})`             
    padding: 20px 10px;
    border-bottom-width: .5px;
    border-bottom-color: ${ props => props.theme.lightshadow };
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;   

export const ListInfo = styled.View.attrs({
})`             
    flex-direction: row;
    align-items: center;
    flex:1;
`;    

export const ListItemText = styled.Text.attrs({
    numberOfLines: 1
})`       
    font-family: Light;
    font-size: 16px; 
    color: ${ props => props.theme.black };
    padding: 0 5px;   
    ${
        props => props.bold ? `
            font-family: Bold;
            color: ${ props.theme.black };
        ` : `
            flex:1;
        `
    }
`; 

export const ListActions = styled.View.attrs({
})`             
    flex-direction: row;
    align-items: center;
`;   

export const ListAction = styled.TouchableOpacity.attrs({
})`            
    padding: 0 5px; 
`;    

export const ListActionIcon = styled(Icon).attrs(props => ({
    width: 24,
    height: 24, 
    stroke: props.theme.black
}))`             
`;    