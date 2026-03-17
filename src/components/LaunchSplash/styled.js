import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Overlay = styled(Animated.View).attrs(({ opacity }) => ({
  style: { opacity },
}))`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 999;
  elevation: 999;
  background: ${props => props.theme.background};
`;

export const SplashArtwork = styled.Image.attrs({
  source: require('../../../assets/splash.png'),
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
`;
