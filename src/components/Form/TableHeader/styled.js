import styled from 'styled-components/native'   

export const RowTableSearch = styled.View.attrs({ 
})`     
    border-top: 1px solid ${ p => p.theme.lightgrey };    
    display: flex;
    
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-wrap: wrap;
    ${
        p => p?.toend ? `
            justify-content: flex-end;
        ` : ``
    }
`;

export const SearchTabs = styled.View.attrs({ 
})`             
    display: flex;
    flex-direction: row;
    
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
`;

export const SearchTab = styled.TouchableOpacity.attrs({ 
})`            
    padding: 10px 16px;
    ${
         p => p?.active ? `
            font-weight: 600;
            color: ${ p.theme.primary };
            border-bottom: 3px solid ${ p.theme.primary };
         ` : ``
    }
    cursor: pointer;
`;

export const SearchTabText = styled.Text.attrs({ 
})`            
    font-size: 14px;
    font-family: Regular;
    color: ${ p => p.theme.black };
    ${
         p => p?.active ? `
            font-weight: 600;
            color: ${ p.theme.primary };
            border-bottom: 3px solid ${ p.theme.primary };
         ` : ``
    }
`;