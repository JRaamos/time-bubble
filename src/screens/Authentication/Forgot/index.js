import React from 'react'  

import {  
    Content,
    Title, 
    FormContent 
} from '@ui/styled'   
 
import ContainerUnauthenticated from '@containers/Unauthenticated'

import Input from '@components/Form/Input' 
import Button from '@components/Form/Button'

import useController from './controller'
import FormSuccess from '@components/Form/Success'

export default function Forgot(){     

    const { 
        back,
        next,
        formValue,
        changeForm,
        steps,
        activeStep,
        loading,
        success
    } = useController ()

    return (
        <>  
            <ContainerUnauthenticated back={back} title={"Recuperar senha"} actions={<>
                { success ? null : <Button loading={loading} onPress={next}>{ steps?.[activeStep]?.label }</Button> }
            </>}> 
                <Content> 
                    { !success ? null : <FormSuccess success={success} /> }
                    {
                        success ? null :
                        <FormContent>
                            <Title>{ steps?.[activeStep]?.title }</Title> 
                            {
                                !(activeStep === 0) ? null : <>
                                    <Input label={'Email'} placeholder={" "} value={ formValue('email') } onChangeText={text => changeForm(text, 'email' )} onSubmitEditing={next} />
                                </>
                            }
                        </FormContent>
                    }
                </Content> 
            </ContainerUnauthenticated> 
        </>
    )
}