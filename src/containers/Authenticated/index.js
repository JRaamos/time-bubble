import React from 'react'  

import { 
    Container,
    Content,
    Actions  
} from './styled'  

import { 
    Scroll
} from '@ui/styled'  
 
import ContainerWrapper from '@containers/Wrapper'
import Keyboard from '@components/Keyboard'

export default function ContainerAuthenticated({ children, actions, refreshControl, backgrounded, scrollRef }){    
    return (
        <>  
            <ContainerWrapper>
                <Container>
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
