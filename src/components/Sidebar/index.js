import React, { useContext, useState, useCallback } from 'react'  
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Constants from 'expo-constants';

import {  
    Container,
    ContentSide,
    SideTop,
    SideBody,
    SideItem,
    SideItemIcon,
    SideItemText,
    SideFooter,
    SideFooterVersion,
    AnimationContentClose,
    ContentClose,
    ThemeIcon
} from './styled'     
import { Safe, Scroll, ProjectIcon } from '@ui/styled'

import { CoreContext } from '@context/CoreContext'
import Button from '@components/Form/Button'

import { DoLogout } from '@services/authentication'




export default function Sidebar({  }){   
    
    const { navigate } = useNavigation()
    const { sidemenu, setSidemenu, darkmode, setDarkmode, setNotifications } = useContext(CoreContext)

    const [ loading, setLoading ] = useState(false)

    
        const options = [
            { title: 'Meu Perfil', page:"Me" },
        ]
    

    const close = () => {
        setSidemenu(!sidemenu)
    }

    const action = item => {
        if(item.page){ navigate(item.page) ;}
        if(item.name){ navigate('List', { ...item }) ;}
        close()
    }

    

    const exit = async () => { 
        setLoading(true)
        await DoLogout()
        setLoading(false)
        setSidemenu(false)
        setNotifications([])
        navigate('Splash');
    }


    

    return !sidemenu ? null : (
        <>   
            <Container>
                <ContentSide>
                    <Safe>
                        
                        <SideBody>
                            <ProjectIcon centred />
                            <Scroll>
                                {
                                    options?.map((item, key) => 
                                        <SideItem key={key} onPress={() => action(item)}>
                                            <SideItemText>{ item.title }</SideItemText>
                                            <SideItemIcon />
                                        </SideItem>
                                    )
                                }
                            </Scroll>
                        </SideBody>
                        <SideFooter>
                            {/* #BEGINS_OPITIONAL_RENDER_AUTHENTICATION */}
                            <Button loading={loading} outline onPress={exit}>Sair</Button>
                            {/* #ENDS_OPITIONAL_RENDER_AUTHENTICATION */}
                            <SideFooterVersion spaced>{ Constants.nativeAppVersion }</SideFooterVersion>
                            <SideFooterVersion>{ Constants.nativeBuildVersion }</SideFooterVersion>
                        </SideFooter>
                    </Safe>
                </ContentSide>
                <AnimationContentClose>
                    <ContentClose onPress={close} />
                </AnimationContentClose>
            </Container> 
        </>
    )
}