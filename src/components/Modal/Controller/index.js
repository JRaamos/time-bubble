import React, { useContext, useEffect } from 'react'   
import { BackHandler } from 'react-native'

import { CoreContext } from '@context/CoreContext'
 
import ModalConfirm from '../Confirm'
import ModalNotifications from '../Notifications'
import ModalOptions from '../Options'

export default function ModalController(props){   

    const { modal, setModal } = useContext(CoreContext) 

    useEffect(() => {
        const backAction = () => {
          if(modal){
            setModal(null)
            return true;
          }
        };
    
        const backHandler = BackHandler.addEventListener( "hardwareBackPress", backAction );
    
        return () => { backHandler.remove() };
    }, [ modal ]);

    return (
        <>    
            { modal?.type === 'confirm' ? <ModalConfirm /> : null }
            { modal?.type === 'notifications' ? <ModalNotifications /> : null }
            { modal?.type === 'options' ? <ModalOptions /> : null }
        </>
    )
}