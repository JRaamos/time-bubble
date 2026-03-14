import styled from 'styled-components/native'     

import LottieView from 'lottie-react-native';    
import ConfettiCannon from 'react-native-confetti-cannon'; 

export const BodyAnimation = styled(LottieView).attrs({
    autoPlay: true,
    loop: true 
})`            
    width: 280px;
    height: 280px;
    margin: 0 auto 20px;
`;   

export const ConfettiEe = styled(ConfettiCannon).attrs({
    count:200,
    origin:{x: -10, y: 0},
    autoStart:false,
})`             
`;    
