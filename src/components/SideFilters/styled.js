import styled from 'styled-components/native'     

export const Title = styled.Text.attrs({
})`            
    font-size: 22px;
    font-weight: bold;
    color: ${props => props.theme.black};
    ${props => props.centred ? `
            text-align: center;
        ` : ``
  }
`;

export const Container = styled.View.attrs({
})`            
    display: flex;
    flex-direction: row;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
`;

export const FormSpacing = styled.View.attrs({
})`
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${props => props.theme.shadow};
`;

export const FilterSidebar = styled.View.attrs({
})` 
  display: flex;
  flex-direction: row;
  flex-direction: column;
  max-width: 384px;
  right: -400px;
  position: absolute;
  padding: 24px;
  margin-bottom: 24px;
  background-color: ${props => props.theme.white};
  box-shadow: -2px 0 5px ${p => p.theme.shadow}; 
  transition: right 0.3s ease-in-out; 
  z-index: 1000; 
  overflow-y: auto;
  ${
    p => p.active ? `
      position: relative;
      right: 0; 
    ` : ``
  }
  @media (max-width: 400px) {
    min-width: 100%;
  }
`;

export const Overlay = styled.TouchableOpacity.attrs({
})`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${p => p.theme.shadow}; 
  z-index: 900;  
  ${
    p => p.active ? `
      display: block;  
    ` : ``
  }
`;
