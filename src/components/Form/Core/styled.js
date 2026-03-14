import styled from 'styled-components/native'     

export const Content = styled.View.attrs({ 
})`
`;

export const FormWrapper = styled.View.attrs({ 
})`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    padding: 24px 0;
    align-items: flex-end;
    @media(max-width:767px){
        flex-direction: column;
    }
`;

export const FormInput = styled.View.attrs({ 
})`
    width: 100%;
    max-width: 30%;
    ${
        props => props.full ? `
            max-width: 100%;
        ` : ``
    }
    ${
        props => props.twothree ? `
            max-width: 66%;
        ` : ``
    }
    ${
        props => props.half ? `
            max-width: 48%;
        ` : ``
    }
    ${
        props => props.quarter ? `
            max-width: 22%;
        ` : ``
    }
    ${
        props => props.twenty ? `
            max-width: 17%;
        ` : ``
    }
`;

export const FormSeparator = styled.View.attrs({ 
})`
    margin: 6px auto;
    width: 96%;
    height: 1px;
    background: ${ props => props.theme.shadow };
    opacity: .3;
`;

export const ContentForm = styled.View.attrs({ 
})`
    position: relative;
    ${
        p => p.active ? `
            padding: 12px;
            border: 1px solid ${ p.theme.shadow };
            border-radius: 8px;
        ` : ``
    }
`;

export const ContentFormHeader = styled.View.attrs({ 
})`
    ${
        p => p.active ? `
            padding: 8px 0 14px 8px;
            border-bottom: 1px solid ${ p.theme.shadow };
        ` : ``
    }
`;

export const ContentFormHeaderText = styled.Text.attrs({ 
})`
    ${
        p => p.active ? `
            font-size: 16px;
            color: ${ p.theme.grey };
        ` : ``
    }
`;


export const UploadContent = styled.View.attrs({ 
})`
    border: 1px solid  ${ p => p.theme.shadow };
    border-style: dashed;
    height: 56px;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ${
        p => p.image ? `
            background: url(${p?.image}) no-repeat center center / contain;
        ` : ``
    }
    cursor: pointer;
`;


export const InputRequired = styled.Text.attrs({ 
})`
    font-size: 14px;
    color: ${ p => p.theme.lightgrey };
`;


export const AutofillButton = styled.TouchableOpacity.attrs({
})`
    padding: 0px;
    position: absolute;
    top: 0;
    right: 0;
    

    cursor: pointer;
    &:hover{
        transition: all .3s ease;
        transform: scale(1.05);
    }
`;

export const AutofillButtonIcon = styled.View.attrs({
    // src:'/icons/circle.svg'
})`
    width: 18px;
    height: 18px; 
    border-radius: 8px;
    margin: -3px -6px;

    border: 1px solid ${ p => p.theme.shadow }; 
`;
