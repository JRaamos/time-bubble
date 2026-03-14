import styled from 'styled-components/native'     

import * as Animatable from 'react-native-animatable';

export const BounceIn = styled(Animatable.View).attrs({
    animation:'bounceIn'
})`            
    width: 100%;
    height: 100%;
`;   
