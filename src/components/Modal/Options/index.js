import React, { useContext, useState } from 'react'   

import {     
    BodyTitle,
    BodyText, 
} from './styled'    

import { CoreContext } from '@context/CoreContext'

import Button from '@components/Form/Button'
import ModalWrapper from '../Wrapper'

export default function ModalOptions(props){   
 
    const { modal, setModal } = useContext(CoreContext) 

    const close = () => {
        setModal(null)
    } 

    const action= item => {
        if(item?.action && typeof item?.action === 'function'){
            item.action()
        } 
        close() 
    } 

    return (
        <>    
            <ModalWrapper fadeclose={close} title={""}> 
                { modal?.text ? <BodyTitle> { modal?.text } </BodyTitle> : null }
                <BodyText />
                {
                    modal?.actions?.map((item, key) => 
                        <Button key={key} outline={item.outline} accent={item.accent} spaced={key > 0} onPress={() => action(item)}>{ item?.label }</Button>
                    )
                }
            </ModalWrapper> 
        </>
    )
}