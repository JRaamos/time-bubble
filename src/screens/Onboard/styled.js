import styled from 'styled-components/native'  
import LottieView from 'lottie-react-native';    

export const OnboardItem = styled.View.attrs({
})`
    background-color: ${ props => props.theme.white };
    box-shadow: 0px 1px 3px ${ props => props.theme.shadow };
    elevation:1;
    border-radius: 8px;
    margin: 18px 0 0;
`;   

export const OnboardAnimation = styled(LottieView).attrs({
    autoPlay: true,
    loop: true 
})`            
    width: 100%;
    height: 300px;
    margin: 0 auto;
`;   

export const Content = styled.View.attrs({
})`
    flex:1;
    align-items: center;
    justify-content: center;
`;   
 
export const OnboardContentInfo = styled.View.attrs({
})`     
    padding: 32px 20px 16px;
    gap: 12px;       
`;   

export const OnboardInfoTitle = styled.Text.attrs({
})`           
    font-family: Bold;
    font-size: 20px; 
    color: ${props => props.theme.black};  
`;   

export const OnboardInfoText = styled.Text.attrs({
})`           
    padding: 20px 0;
    font-family: Regular;
    font-size: 14px; 
    color: ${props => props.theme.grey};   
    text-align: justify;
`;   

export const StepIndicatorContent = styled.View.attrs({
})`       
    flex-direction: row;
    justify-content:center;     
    padding: 32px 16px;
`;  

export const StepIndicator = styled.TouchableOpacity.attrs({
})`            
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${props => props.theme.lightgrey};
    margin: 0 10px;
    ${
        props => props.active ? `
            background-color: ${ props.theme.primary};
        ` : ``
    }
`;     