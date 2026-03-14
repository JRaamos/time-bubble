import styled from 'styled-components/native'       
import Icon from '@assets/icons'   

export const BodyContent = styled.View.attrs({
})`
`;
export const BodyItem = styled.View.attrs({
})`
    padding: 24px 16px;
    background: ${ props => props.theme.white };
    flex-direction: row;
    align-items: center;
    border-radius: 16px;
    margin-bottom: 16px;
`;
export const BodyItemIcon = styled(Icon).attrs(props => ({
    width: 25,
    height: 25,
    icon: 'circleInfo',
    stroke: props.theme.primary
}))`
    margin-right: 12px;
`;
export const BodyItemText = styled.Text.attrs({
})`
    font-family: Regular;
    font-size: 16px;
    color: ${ props => props.theme.grey };
    flex:1;
`;
export const BodyItemTextBold = styled.Text.attrs({
})`
    font-family: Bold;
    color: ${ props => props.theme.primary };
`;
export const BodyItemAction = styled.TouchableOpacity.attrs({
})`
`;
export const BodyItemActionIcon = styled(Icon).attrs(props => ({
    width: 25,
    height: 25,
    icon: 'trash',
    stroke: props.theme.grey
}))`
    margin-left: 12px;
`;