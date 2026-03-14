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
import PasswordValidation from '@components/Form/PasswordValidation'
import FormSuccess from '@components/Form/Success'

export default function Register(){    

    const {
        formValue,
        changeForm,
        next,
        back,
        steps,
        activeStep,
        success,
        loading
    } = useController()

    return (
        <>  
            <ContainerUnauthenticated keep back={back} title={"Criar conta"} actions={<>
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
                                    <Input label={'Nome'} placeholder={" "} value={ formValue('name') } onChangeText={text => changeForm(text, 'name' )} />
                                    <Input label={'Email'} placeholder={" "} value={ formValue('email') } onChangeText={text => changeForm(text, 'email' )} />
                                </>
                            }
                            {
                                !(activeStep === 1) ? null : <>
                                    <Input label={'Senha'} secureTextEntry placeholder={" "} value={ formValue('password') } onChangeText={text => changeForm(text, 'password' )}  onSubmitEditing={next} />
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