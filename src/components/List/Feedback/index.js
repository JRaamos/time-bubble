import React from 'react'  

import { 
    FeedbackContainer 
} from './styled'    

import { 
    Title,
    BodyAnimation
} from '@ui/styled'    

export default function ListFeedback({ title, source }){    

    return (
        <>   

            <FeedbackContainer>
                <BodyAnimation source={source} />
                <Title centred>{ title }</Title> 
            </FeedbackContainer>  
        </>
    )
}