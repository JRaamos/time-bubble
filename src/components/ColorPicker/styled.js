import styled from 'styled-components/native'

import LibraryColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker'

export const PickerCard = styled.View.attrs({
})`
    padding: 0px 0px 18px;
    margin-bottom: ${props => props.last ? '0px' : '18px'};
`;

export const PickerHeader = styled.View.attrs({
})`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const PickerTitle = styled.Text.attrs({
})`
    font-family: SemiBold;
    font-size: 16px;
    color: ${props => props.theme.timerFace};
`;

export const PickerValue = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 12px;
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
    height: 224px;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 10px;
`;

export const PickerHue = styled(HueSlider).attrs({
})`
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 12px;
`;

export const PickerMeta = styled.View.attrs({
})`
    flex-direction: row;
    align-items: center;
`;

export const PickerPreview = styled.View.attrs({
})`
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background: ${props => props.previewHex};
    border-width: 2px;
    border-color: ${props => props.theme.timerFace};
    margin-right: 10px;
`;

export const PickerHint = styled.Text.attrs({
})`
    flex: 1;
    font-family: Regular;
    font-size: 12px;
    line-height: 18px;
    color: ${props => props.theme.timerTextMuted};
`;
