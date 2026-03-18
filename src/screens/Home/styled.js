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

export const Preview = styled.View.attrs({
})`
    padding: 20px 18px 18px;
    border-radius: 24px;
    background: ${props => props.theme.timerSurface};
    border-width: 1px;
    border-color: ${props => props.theme.lightshadow};
    margin-bottom: 18px;
`;

export const PreviewHeader = styled.View.attrs({
})`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
`;

export const PreviewTitle = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 18px;
    color: ${props => props.theme.black};
`;

export const PreviewTag = styled.View.attrs({
})`
    padding: 6px 12px;
    border-radius: 999px;
    background: ${props => props.active ? props.theme.timerAccent : props.theme.timerSurfaceSoft};
`;

export const PreviewTagText = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${props => props.theme.timerFace};
    
`;

export const PreviewBubble = styled.View.attrs({
})`
    align-items: center;
    padding: 8px 16px;
    border-radius: 22px;
    background: ${props => props.backgroundHex || props.theme.timerFace};
    margin-bottom: 16px;
`;

export const PreviewTime = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 40px;
    color: ${props => props.textHex || props.theme.timerFaceText};
    text-align: center;
`;

export const PreviewHint = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 14px;
    line-height: 22px;
    color: ${props => props.theme.timerTextMuted};
`;

export const InlineActions = styled.View.attrs({
})`
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    margin-top: 16px;
`;

export const SecondaryAction = styled.TouchableOpacity.attrs({
    activeOpacity: 0.82,
})`
    flex: 1;
    padding: 16px;
    border-radius: 16px;
    background: ${props => props.danger ? props.theme.timerDanger : props.theme.timerSurfaceSoft};
    align-items: center;
    justify-content: center;
    margin-right: ${props => props.first ? '10px' : '0px'};
`;

export const SecondaryActionText = styled.Text.attrs({
})`
    font-family: Bold;
    font-size: 14px;
    color: ${props => props.theme.timerFace};
`;

export const GestureList = styled.View.attrs({
})`
    padding: 18px;
    border-radius: 20px;
    background: ${props => props.theme.timerSurface};
    border-width: 1px;
    border-color: ${props => props.theme.lightshadow};
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
    padding: 20px 18px 18px;
    border-radius: 24px;
    background: ${props => props.theme.timerSurface};
    border-width: 1px;
    border-color: ${props => props.theme.lightshadow};
    margin-bottom: 18px;
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
    font-size: 14px;
    line-height: 22px;
    color: ${props => props.theme.timerTextMuted};
    margin-bottom: 18px;
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
