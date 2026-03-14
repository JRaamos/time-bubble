import styled from "styled-components/native";
import MapView from "react-native-maps";

export const Wrapper = styled.View`
  width: 100%;
  margin-top: 20px;
  position: relative;
`;

export const MapContainer = styled(MapView)`
  width: 100%;
  height: 400px;
  border-radius: 8px;
`;

export const DisableLayer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: transparent;
`;
