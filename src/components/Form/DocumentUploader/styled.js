import styled from 'styled-components/native'     

import icons from '@assets/icons';

import { CameraView, CameraType } from 'expo-camera';
import { WindowScreen } from '@ui/styled';
 

 

export const HomeItemContainer = styled.TouchableOpacity.attrs({
})`
    border-radius: 14px;
    overflow: hidden;
    margin: 0px 0 16px;
`;

export const HomeBodyCamera = styled(CameraView).attrs({
    facing: 'back'
})`
    width: 100%;
    height: ${ WindowScreen.height * .6 }px;
    background: black;
`;   


export const HomeBodyCameraPreview = styled.ImageBackground.attrs({
})`
    width: 100%;
    height: ${ WindowScreen.height * .6 }px;
`;   








export const HomeBodyCameraActions = styled.View.attrs({
})`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const HomeBodyCameraGallery = styled.TouchableOpacity.attrs({
})`
    padding: 12px;
    border-radius: 24px;
    background: ${ p => p.theme.secondary };
    flex-direction: row;
    align-items: center;
`;
export const HomeBodyCameraGalleryText = styled.Text.attrs({
})`
    color: ${ p => p.theme.white };
    margin-left: 4px;
    margin-right: 2px;
`;
export const HomeBodyCameraGalleryIcon = styled(icons).attrs(props => ({
    width: 18,
    height: 18,
    stroke: props.theme.white,
    icon: "photo"
}))`
`;
export const HomeBodyCameraSpacer = styled.View.attrs({
})`
    width: 90px;
`;
export const HomeBodyCameraButtonDecoration = styled.TouchableOpacity.attrs({
})`
    padding: 4px;
    border-width: 4px;
    border-radius: 32px;
    border-color: ${ p => p.theme.buttonbordershadow };
`;
export const HomeBodyCameraButton = styled.View.attrs({
})`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background: ${ p => p.theme.lightshadow };
`;   

export const FormSpacer = styled.View.attrs({
})`
    margin-top: ${ WindowScreen.height * .3 }px;
`;   
