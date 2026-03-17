import styled from 'styled-components/native'

import LibraryColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker'

export const PickerCard = styled.View.attrs({
})`
    padding: 16px;
    border-radius: 20px;
    background: ${props => props.theme.timerSurfaceSoft};
    border-width: 1px;
    border-color: ${props => props.theme.lightshadow};
    margin-bottom: ${props => props.last ? '0px' : '16px'};
`;

export const PickerHeader = styled.View.attrs({
})`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const PickerTitle = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 15px;
    color: ${props => props.theme.black};
`;

export const PickerValue = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 13px;
    color: ${props => props.theme.timerTextMuted};
    letter-spacing: 1px;
    text-transform: uppercase;
`;

export const PickerLibrary = styled(LibraryColorPicker).attrs({
    boundedThumb: true,
    sliderThickness: 26,
    thumbShape: 'ring',
    thumbSize: 28,
})`
    width: 100%;
`;

export const PickerPanel = styled(Panel1).attrs({
})`
    width: 100%;
    height: 248px;
    border-radius: 18px;
    overflow: hidden;
    margin-bottom: 12px;
`;

export const PickerHue = styled(HueSlider).attrs({
})`
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 14px;
`;

export const PickerMeta = styled.View.attrs({
})`
    flex-direction: row;
    align-items: center;
`;

export const PickerPreview = styled.View.attrs({
})`
    width: 26px;
    height: 26px;
    border-radius: 13px;
    background: ${props => props.previewHex};
    border-width: 2px;
    border-color: ${props => props.theme.timerFace};
    margin-right: 10px;
`;

export const PickerHint = styled.Text.attrs({
})`
    flex: 1;
    font-family: Regular;
    font-size: 13px;
    line-height: 20px;
    color: ${props => props.theme.timerTextMuted};
`;
