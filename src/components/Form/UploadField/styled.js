import styled from 'styled-components/native'   

export const UploadContent = styled.ImageBackground.attrs({ 
    resizeMode: 'contain'
})`
    border: 1px solid  ${ p => p.theme.shadow };
    border-style: dashed;
    min-height: 56px;

    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${
        p => p.image ? `
            background: url(${p?.image}) no-repeat center center / contain;
        ` : ``
    }
    ${
        p => p.squared ? `
            aspect-ratio: 1 / 1 ;
        ` : ``
    }
    cursor: pointer;
`;


export const UploadContentText = styled.Text.attrs({ 
})`
    font-family: Regular;
    font-size: 14px;
    color: ${ p => p.theme.lightgrey };
`;

export const InputRequired = styled.Text.attrs({ 
})`
    font-family: Regular;
    font-size: 14px;
    color: ${ p => p.theme.lightgrey };
`;