import styled from 'styled-components/native'
import QRCode from 'react-native-qrcode-svg'

import Icon from '@assets/icons'

export const Screen = styled.View.attrs({
})`
    min-height: 100%;
    padding: 20px 12px 36px;
    background: ${props => props.theme.timerScreen};
`;

export const Hero = styled.View.attrs({
})`
    padding: 20px 18px 18px;
    border-radius: 24px;
    background: ${props => props.theme.timerSurface};
    border-width: 1px;
    border-color: ${props => props.theme.lightshadow};
    margin-bottom: 18px;
`;

export const HeroRow = styled.View.attrs({
})`
    flex-direction: row;
    align-items: center;
    margin-bottom: 18px;
`;

export const BrandBubble = styled.View.attrs({
})`
    width: 58px;
    height: 58px;
    border-radius: 29px;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.timerAccent};
    border-width: 3px;
    border-color: ${props => props.theme.timerAccentSoft};
    margin-right: 14px;
`;

export const BrandCopy = styled.View.attrs({
})`
    flex: 1;
`;

export const Eyebrow = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${props => props.theme.timerTextMuted};
    margin-bottom: 6px;
`;

export const HeroTitle = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 28px;
    line-height: 34px;
    color: ${props => props.theme.black};
`;

export const HeroText = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 15px;
    line-height: 24px;
    color: ${props => props.theme.timerTextMuted};
    margin-bottom: 18px;
`;

export const PrimaryAction = styled.TouchableOpacity.attrs(props => ({
    activeOpacity: props.disabled ? 1 : 0.82,
    disabled: props.disabled,
}))`
    padding: 18px;
    border-radius: 18px;
    background: ${props => props.disabled ? props.theme.timerSurfaceSoft : props.theme.timerAccent};
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const PrimaryActionText = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 18px;
    color: ${props => props.theme.timerFace};
`;

export const PrimaryActionIcon = styled(Icon).attrs(props => ({
    icon: 'clock',
    width: 20,
    height: 20,
    stroke: props.theme.timerFace,
    fill: 'transparent',
}))`
`;

export const SummaryGrid = styled.View.attrs({
})`
    margin: 18px 0px;
`;

export const SummaryCard = styled.View.attrs({
})`
    padding: 18px;
    border-radius: 20px;
    background: ${props => props.theme.timerSurface};
    border-width: 1px;
    border-color: ${props => props.active ? props.theme.timerBorder : props.theme.lightshadow};
    margin-bottom: 14px;
`;

export const SummaryLabel = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${props => props.theme.timerTextMuted};
    margin-bottom: 10px;
`;

export const SummaryValue = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 20px;
    line-height: 26px;
    color: ${props => props.theme.black};
    margin-bottom: 6px;
`;

export const SummaryText = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 14px;
    line-height: 22px;
    color: ${props => props.theme.timerTextMuted};
`;

export const GestureList = styled.View.attrs({
})`
    padding: 18px;
    border-radius: 20px;
    background: ${props => props.theme.timerSurface};
    border-width: 1px;
    border-color: ${props => props.theme.lightshadow};
    margin-bottom: 20px;
`;

export const GestureTitle = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 18px;
    color: ${props => props.theme.black};
    margin-bottom: 12px;
`;

export const GestureRow = styled.View.attrs({
})`
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 12px;
`;

export const GestureBullet = styled.View.attrs({
})`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: ${props => props.theme.timerAccent};
    margin-top: 7px;
    margin-right: 12px;
`;

export const GestureText = styled.Text.attrs({
})`
    flex: 1;
    font-family: Regular;
    font-size: 14px;
    line-height: 22px;
    color: ${props => props.theme.timerTextMuted};
`;

export const CustomizeCard = styled.View.attrs({
})`
    padding: 18px;
    margin-bottom: 18px;
    background: ${props => props.theme.timerSurface};
    border-radius: 20px;
    border-color: ${props => props.theme.lightshadow};
    border-width: 1px;
`;

export const CustomizeTitle = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 18px;
    color: ${props => props.theme.black};
    margin-bottom: 8px;
`;

export const CustomizeHint = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 13px;
    line-height: 20px;
    color: ${props => props.theme.timerTextMuted};
    margin-bottom: 10px;
`;

export const CustomizeDivider = styled.View.attrs({
})`
    height: 1px;
    background: ${props => props.theme.lightshadow};
    margin: 4px 0px 8px;
`;

export const CustomizeItemStack = styled.View.attrs({
})`
    margin-bottom: 18px;
`;

export const CustomizeItemRow = styled.View.attrs({
})`
    flex-direction: row;
    align-items: flex-start;
`;

export const CustomizeItemIcon = styled(Icon).attrs(props => ({
    fill: 'transparent',
    stroke: props.theme.timerFace,
}))`
    margin-top: 3px;
    margin-right: 12px;
`;

export const CustomizeItemLabelGroup = styled.View.attrs({
})`
    flex: 1;
`;

export const CustomizeItemLabel = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 16px;
    line-height: 21px;
    color: ${props => props.theme.timerFace};
    margin-bottom: 4px;
`;

export const CustomizeItemDescription = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 13px;
    line-height: 19px;
    color: ${props => props.theme.timerTextMuted};
`;

export const CustomizeOptionLabel = styled.Text.attrs({
})`
    font-family: SemiBold;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${props => props.theme.timerAccentSoft};
    margin-top: 12px;
    margin-left: 30px;
`;

export const CustomizeToggle = styled.View.attrs({
})`
    padding: 16px 0px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.lightshadow};
`;

export const CustomizeToggleRow = styled.View.attrs({
})`
    flex-direction: row;
    align-items: flex-start;
`;

export const CustomizeToggleMarker = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${props => props.active ? props.theme.timerAccentSoft : props.theme.timerAccent};
    margin-right: 10px;
    min-width: 34px;
`;

export const CustomizeToggleCopy = styled.View.attrs({
})`
    flex: 1;
    margin-right: 12px;
`;

export const CustomizeToggleLabel = styled.Text.attrs({
})`
    font-family: SemiBold;
    font-size: 16px;
    line-height: 20px;
    color: ${props => props.theme.timerFace};
`;

export const CustomizeToggleHint = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: ${props => props.subtle ? '12px' : '12px'};
    line-height: ${props => props.subtle ? '18px' : '18px'};
    color: ${props => props.subtle ? props.theme.timerTextMuted : props.active ? props.theme.timerAccentSoft : props.theme.timerTextMuted};
    margin-top: ${props => props.subtle ? '6px' : '4px'};
`;

export const CustomizeFontsScroll = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
        alignItems: 'stretch',
        paddingHorizontal: 2,
        paddingRight: 10,
    },
})`
    margin-top: 10px;
`;

export const CustomizeOptionPreview = styled.TouchableOpacity.attrs(props => ({
    activeOpacity: props.disabled ? 1 : 0.82,
    disabled: props.disabled,
}))`
    width: 138px;
    min-height: 110px;
    padding: 12px 12px 14px;
    border-radius: 16px;
    background: ${props => props.theme.timerSurface};
    border-width: ${props => props.active ? '1.5px' : '1px'};
    border-color: ${props => props.active ? props.theme.timerBorder : props.theme.lightshadow};
    margin-right: 12px;
    justify-content: flex-end;
    opacity: ${props => props.disabled ? 0.6 : 1};
`;

export const CustomizeOptionPreviewSample = styled.View.attrs({
})`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const CustomizeOptionPreviewValue = styled.Text.attrs({
})`
    font-family: ${props => props.fontFamily};
    font-size: 18px;
    line-height: 22px;
    letter-spacing: ${props => `${props.letterSpacing || 0}px`};
    color: ${props => props.active ? props.theme.timerAccentSoft : props.theme.timerFace};
    text-align: center;
`;

export const CustomizeOptionPreviewLabel = styled.Text.attrs({
})`
    font-family: ${props => props.active ? 'Bold' : 'Medium'};
    font-size: 12px;
    line-height: 16px;
    color: ${props => props.active ? props.theme.timerFace : props.theme.timerTextMuted};
    text-align: center;
    margin-top: 8px;
`;

export const DonationCard = styled.View.attrs({
})`
    padding: 20px 18px 18px;
    border-radius: 24px;
    background: ${props => props.theme.timerSurface};
    border-width: 1px;
    border-color: ${props => props.theme.lightshadow};
    margin-bottom: 18px;
`;

export const DonationEyebrow = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${props => props.theme.timerAccentSoft};
    margin-bottom: 8px;
`;

export const DonationTitle = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 22px;
    line-height: 28px;
    color: ${props => props.theme.black};
    margin-bottom: 10px;
`;

export const DonationHint = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 15px;
    line-height: 24px;
    color: ${props => props.theme.timerTextMuted};
    margin-bottom: 18px;
`;

export const DonationQrFrame = styled.View.attrs({
})`
    align-items: center;
    justify-content: center;
    padding: 18px;
    border-radius: 24px;
    background: ${props => props.theme.timerSurfaceSoft};
    border-width: 1px;
    border-color: ${props => props.theme.lightshadow};
    margin-bottom: 16px;
`;

export const DonationQrCode = styled(QRCode).attrs(props => ({
    backgroundColor: props.theme.pickerWhite,
    color: props.theme.pickerBlack,
    size: 220,
}))``;

export const DonationButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.82,
})`
    min-height: 52px;
    border-radius: 16px;
    background: ${props => props.theme.timerAccent};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
`;

export const DonationButtonIcon = styled(Icon).attrs(props => ({
    icon: 'copy',
    width: 18,
    height: 18,
    stroke: props.theme.timerFace,
    fill: 'transparent',
}))`
    margin-right: 10px;
`;

export const DonationButtonText = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 17px;
    color: ${props => props.theme.timerFace};
`;

export const DonationCopy = styled.View.attrs({
})`
    margin-bottom: 14px;
`;

export const DonationLabel = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${props => props.theme.timerTextMuted};
    margin-bottom: 6px;
`;

export const DonationValue = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 16px;
    line-height: 24px;
    color: ${props => props.theme.black};
`;
