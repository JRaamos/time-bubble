import React, { useContext, useEffect, useRef, useState } from "react";

import Core from "@components/Form/Core";
import Button from "@components/Form/Button";


import Icon from '@assets/icons'   
import { ButtonContainer, Touch } from "@ui/styled";
import { Container, FilterSidebar, FormSpacing, Overlay, Title } from "./styled";


export default function SideFilters({ formItems, isActive, setIsActive, currentFilters, setCurrentFilters }) {

  const refForm = useRef()

  const save = async () => {
    const form = refForm?.current?.getForm()
    if(!form) return;
    setCurrentFilters(form)
    toggleSidebar()
  };

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const clear = () => {
    setCurrentFilters({})
    toggleSidebar()
  };


  return (
    <>
      <FilterSidebar active={isActive ? 'active' : ''}>
        <ButtonContainer between>
          <Title>Filtros</Title>
          <Touch onPress={toggleSidebar}>
            {/* <Icon stroke={'white'} icon='close' pointer /> */}
          </Touch>
        </ButtonContainer>
        <FormSpacing />
        <Container>
          { formItems && <Core formItems={formItems} ref={refForm} register={currentFilters} /> }
          <ButtonContainer column>
            <Button full fullRadius color={'primary'} light onPress={save}>Filtrar</Button>
            <Button full fullRadius onPress={clear} color="primary" light outline black>Limpar filtros</Button>
          </ButtonContainer>
        </Container>
      </FilterSidebar >
      {/* <Overlay active={isActive ? 'active' : ''} onPress={toggleSidebar} /> */}
    </>
  );
}