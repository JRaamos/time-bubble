import React from 'react'  

import ContainerWrapper from '@containers/Wrapper'
import useController from './controller'
 
export default function Splash(){   

    useController()

    return (
        <>  
            <ContainerWrapper image> 
            </ContainerWrapper> 
        </>
    )
}