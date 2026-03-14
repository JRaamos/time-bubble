import React from 'react'

import {  
    Content,
    Title, 
    FormContent 
} from '@ui/styled'   
 
import ContainerUnauthenticated from '@containers/Unauthenticated'

import Input from '@components/Form/Input' 
import Button from '@components/Form/Button'

import PasswordValidation from '@components/Form/PasswordValidation'
import FormSuccess from '@components/Form/Success'

import useController from './controller'

export default function CreatePassword(){   
    
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
            <ContainerUnauthenticated back={back} title={"Criar senha"} actions={<>
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
                                    <Input label={'Nova senha'} secureTextEntry placeholder={" "} value={ formValue('password') } onChangeText={text => changeForm(text, 'password' )} />
                                    <Input label={'Confirmar nova senha'} secureTextEntry placeholder={" "} value={ formValue('cpassword') } onChangeText={text => changeForm(text, 'cpassword' )} onSubmitEditing={next} />
                                    <PasswordValidation password={ formValue('password') } />
                                </>
                            }
                        </FormContent>
                    }
                </Content> 
            </ContainerUnauthenticated> 
        </>
    )
}