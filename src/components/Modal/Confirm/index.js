import React, { useContext, useState } from 'react'   

import {    
    ButtonSpace
} from './styled'   

import {    
    BodyAnimation
} from '@ui/styled'   

import { CoreContext } from '@context/CoreContext'

import Button from '@components/Form/Button'
import ModalWrapper from '../Wrapper'

export default function ModalConfirm(props){   
 
    const { modal, setModal } = useContext(CoreContext) 
    const [loading, setLoading] = useState(false)

    const close = () => {
        setModal(null)
    }

    const refuse = () => {
        close() 
    } 

    const confirm = async () => {
        if(modal.action && typeof modal.action === 'function'){
            setLoading(true)
            await modal.action()
            setLoading(false)
        }
        close() 
    } 

    return (
        <>    
            <ModalWrapper fadeclose={close} title={modal?.title}>
                <BodyAnimation source={require('@assets/lotties/confirm.json')} />
                <Button outline onPress={confirm} loading={loading}>Confirm</Button>
                <ButtonSpace />
                <Button onPress={refuse}>Cancel</Button>
            </ModalWrapper> 
        </>
    )
}