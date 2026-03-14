import icons from '@assets/icons';
import styled from 'styled-components/native'     

export const BadgePoll = styled.View.attrs({ 
})`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px; 
    align-items: center;
    min-height: 56px;
`; 

export const Badge = styled.View.attrs({ 
})`
    padding: 4px 4px 4px 8px;
    border-radius: 16px ;
    border: 1px solid ${ props => props.theme.shadow };
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;  
`;

export const BadgeText = styled.Text.attrs({ 
})`
    font-family: Regular;  
    color: ${ props => props.theme.shadow };
`;
export const BadgeRemove = styled.TouchableOpacity.attrs({ 
})`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: ${ props => props.theme.shadow };

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all .3s ease;
    &:hover { 
        transform: scale(1.05);
    }
`;

export const BadgeRemoveIcon = styled(icons).attrs(p => ({ 
    icon: 'close',
    stroke: p.theme.white,
    width: 16
}))`
`;

