import React from 'react'  

import { PasswordValidationContainer } from './styled'
import FormCheck from '@components/Form/Check'

export default function PasswordValidation({ password }){    
    return (
        <>   
            <PasswordValidationContainer>
                <FormCheck active={ password?.match(/[A-Z]/) } title={"Uma letra maiúscula"} />
                <FormCheck active={ password?.match(/[0-9]/) } title={"Um número"} />
                <FormCheck active={ password?.length > 5 } title={"Pelo menos 6 caracteres"} />
                <FormCheck active={ password?.match(/[-./',;&@#*)(_+:"´`~]/) } title={"Pelo menos 1 caractere especial"} />
            </PasswordValidationContainer>  
        </>
    )
}