import React, { useCallback } from 'react'  
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { 
    Container,
    Content,
    Actions  
} from './styled'  

import { 
    Scroll
} from '@ui/styled'  
 
import { ReadObject } from '@services/storage'
import ContainerWrapper from '@containers/Wrapper'

import Header from '@components/Header' 
import Keyboard from '@components/Keyboard'
import Sidebar from '@components/Sidebar'

export default function ContainerAuthenticated({ children, back, actions, noBack, noHeader, rightAction, side, keep, title, refreshControl, notifications, backgrounded, closeable, scrollRef }){    
    const { goBack, navigate } = useNavigation() 
    
    const completeLogout = () => {
        navigate('Login')
    }
    
    const init = async () => {
        const authentication = await ReadObject('authentication')
        if (!authentication?.jwt && !keep) {
            completeLogout()
        }
    }

    useFocusEffect(useCallback(() => {  
        init() 
    },[]))

    return (
        <>  
            <ContainerWrapper>
                <Container>
                    { noHeader ? null : <Header back={back ? back : goBack} noBack={noBack} rightAction={rightAction} side={side} title={title} notifications={notifications} closeable={closeable} /> }
                    <Scroll ref={scrollRef} refreshControl={refreshControl} backgrounded={backgrounded}>
                        <Content>
                            { children }
                        </Content>
                    </Scroll>  
                    {
                        !actions ? null :
                            <Actions>
                                { actions }
                            </Actions>
                    }
                    <Keyboard /> 
                </Container>
            </ContainerWrapper> 
            { side ? <Sidebar /> : null }
        </>
    )
}