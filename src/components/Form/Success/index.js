import React from 'react'  

import {  
    Title, 
    FormContent,
    BodyAnimation
} from '@ui/styled'    

import Button from '@components/Form/Button'

export default function FormSuccess({ success }){    

    return (
        <>   
            <FormContent>
                <BodyAnimation source={require('@assets/lotties/success.json')} />
                <Title centred>{ success?.title }</Title> 
            </FormContent>
            <Button onPress={success?.action ? success.action() : null}>{ success?.label }</Button>  
        </>
    )
}