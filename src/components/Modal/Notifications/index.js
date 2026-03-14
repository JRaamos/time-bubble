import React, { useContext, useState } from 'react'   

import {    
    BodyContent,
    BodyItem,
    BodyItemIcon,
    BodyItemText,
    BodyItemTextBold,
    BodyItemAction,
    BodyItemActionIcon
} from './styled'   

import { CoreContext } from '@context/CoreContext'

import Button from '@components/Form/Button'
import ModalWrapper from '../Wrapper'
import { ReadNotifications, RemoveNotification, RemoveAllNotifications } from '@services/notifications'

export default function ModalNotifications(props){   
 
    const { modal, setModal, notifications, setNotifications } = useContext(CoreContext)  

    const close = () => {
        setModal(null)
    }

    const [loading, setLoading] = useState(false)

    const reloadNotifications = async () => {
        setLoading(true)
        const notifications = await ReadNotifications()
        setNotifications(notifications && notifications?.length ? notifications : [] )
        setLoading(false)
    }

    const remove = async item => {
        setLoading(true)
        await RemoveNotification(item.id)
        await reloadNotifications()
    }

    const clearAll = async () => {
        setLoading(true)
        await RemoveAllNotifications()
        await reloadNotifications()
        close()
    }

    return (
        <>    
            <ModalWrapper fadeclose={close} title={"Notificações"}>
                <BodyContent>
                    {
                        notifications.map((item, key) => 
                            <BodyItem key={key}>
                                <BodyItemIcon />
                                <BodyItemText>
                                    { item.text }
                                </BodyItemText>
                                <BodyItemAction onPress={() => remove(item)}>
                                    <BodyItemActionIcon />
                                </BodyItemAction>
                            </BodyItem>
                        )
                    }
                </BodyContent>
                <Button outline loading={loading} spaced onPress={clearAll}>Limpar todas</Button>
            </ModalWrapper> 
        </>
    )
}