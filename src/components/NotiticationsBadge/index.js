import React, { useContext } from 'react'    
import Toast from 'react-native-toast-message'

import {    
    HeaderAction,
    HeaderActionIcon,
    HeaderActionDecoration,
    HeaderActionDecorationText
} from './styled'   


import { CoreContext } from '@context/CoreContext'

export default function NotiticationsBadge(){      

    const { setModal, notifications } = useContext(CoreContext)

    const openNotifications = () => {
        setModal({ type:'notifications' })
    }

    const noNotifications = () => {
        Toast.show({ type: 'success', text1: 'Você não possui novas notificações' });
    }

    return (
        <>    
            <HeaderAction onPress={!notifications?.length ? noNotifications : openNotifications}>
                <HeaderActionIcon />
                {
                    !notifications?.length ? null :
                    <HeaderActionDecoration>
                        <HeaderActionDecorationText>{ notifications?.length }</HeaderActionDecorationText>
                    </HeaderActionDecoration>
                }
            </HeaderAction> 
        </>
    )
}