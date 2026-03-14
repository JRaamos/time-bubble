import React from 'react'  

import {  
    ModalContainer,
    ModalFader,
    ModalBody,

    RowHeader,
    HeaderItem,
    HeaderTitle,
    HeaderClose,
    HeaderCloseIcon,

    MenuContent,
    HeaderTitleContent,
    HeaderTitleIcon
} from './styled'   

import {  
    Scroll
} from '@ui/styled'   

export default function ModalWrapper(props){    
    return (
        <>   
            <ModalContainer>
                <ModalFader onPress={props.fadeclose ? props.fadeclose : props.close} />
                <ModalBody>
                    <Scroll>

                        <RowHeader>
                            <HeaderItem />
                            <HeaderTitleContent>
                                { props?.title ? <HeaderTitle>{ props?.title }</HeaderTitle> : null }
                                { props?.icon ? <HeaderTitleIcon icon={props?.icon} /> : null }
                            </HeaderTitleContent>
                            {
                                !props.close ? <HeaderItem /> :
                                <HeaderClose onPress={props.close}>
                                    <HeaderCloseIcon />
                                </HeaderClose>
                            }
                        </RowHeader> 
                        <MenuContent>
                            { props.children }
                        </MenuContent> 
                    </Scroll>
                </ModalBody>
            </ModalContainer>
        </>
    )
}