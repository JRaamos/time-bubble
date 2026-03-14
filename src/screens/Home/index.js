import React from 'react'    

import {   
    BodyAnimation 
} from './styled'   

import {  
    Content,
    Title,
    Text
} from '@ui/styled'   
 
import ContainerAuthenticated from '@containers/Authenticated'  

import useController from './controller';

export default function Home(){     
    
    useController()

    return (
        <>  
            <ContainerAuthenticated side notifications> 
                <Content> 
                    <BodyAnimation source={require('@assets/lotties/peace.json')} />
                    <Title centred>Estado vazio</Title>
                    <Text centred>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies iaculis auctor. Ut vel lorem congue felis facilisis pretium non nec mauris. Morbi placerat metus nisi, vitae ullamcorper ligula vestibulum ac. Sed sollicitudin sagittis nisi, a commodo massa vestibulum sit amet.</Text>
                </Content> 
            </ContainerAuthenticated>  
        </>
    )
}