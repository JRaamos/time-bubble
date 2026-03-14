import React, { useContext } from 'react'  

import {  
    HeaderContainer,
    HeaderItem,
    BackIcon,
    MenuIcon,
    HeaderTitle,
    SkipItem,
    SkipItemText,
    CloseIcon
} from './styled'     

import { CoreContext } from '@context/CoreContext'
import NotiticationsBadge from '@components/NotiticationsBadge'

export default function Header({ back, noBack, rightAction, side, title, notifications, closeable }){   

    const { sidemenu, setSidemenu } = useContext(CoreContext)

    return (
        <>   
            <HeaderContainer>
                {
                    side ? 
                    <HeaderItem onPress={() => setSidemenu(!sidemenu)}>
                        <MenuIcon />
                    </HeaderItem> :
                    back && !noBack ? 
                    <HeaderItem onPress={back}>
                        <BackIcon />
                    </HeaderItem> : <HeaderItem /> 
                }
                { title ? <HeaderTitle>{ title }</HeaderTitle> : null }
                {
                    rightAction ? 
                        <SkipItem onPress={ rightAction.action }>
                            <SkipItemText>{ rightAction.label }</SkipItemText>
                        </SkipItem>
                    : notifications ? 
                        <NotiticationsBadge />
                    : closeable ? 
                        <HeaderItem onPress={closeable}>
                            <CloseIcon />
                        </HeaderItem>
                    : <HeaderItem /> 
                }
            </HeaderContainer> 
        </>
    )
}