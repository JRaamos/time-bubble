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
import { useFaceId } from '@hooks/useFaceId'

export default function ContainerUnauthenticated({ children, back, noBack, noHeader, rightAction, keep, title, refreshControl, backgrounded, actions, closeable, scrollRef }){    
    const { goBack, navigate } = useNavigation() 

    const { askFaceId } = useFaceId()

    const completeLogin = async () => {
        const can = await askFaceId()
        if(can) navigate('Home');
    }
    
    const init = async () => {
        const authentication = await ReadObject('authentication')
        if (authentication?.jwt && !keep) {
            completeLogin()
        }
    }

    useFocusEffect(useCallback(() => {  
        init() 
    },[]))

    return (
        <>  
            <ContainerWrapper>
                <Container>
                    { noHeader ? null : <Header back={back ? back : goBack} noBack={noBack} rightAction={rightAction} title={title} closeable={closeable} /> }
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
        </>
    )
}