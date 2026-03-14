import React from 'react'  

import {  
    Content,
    Title, 
    FormContent,
    ProjectIcon
} from '@ui/styled'   
 
import ContainerUnauthenticated from '@containers/Unauthenticated'

import Input from '@components/Form/Input'
import Button from '@components/Form/Button'

import useController from './controller'

export default function Login(){   

    const {
        forgot,
        formValue,
        changeForm,
        valid,
        login,
        loading,
        createAccount
    } = useController()

    return (
        <>  
            <ContainerUnauthenticated noHeader > 
                <Content> 
                    <FormContent>
                        <ProjectIcon />
                        <Title>Entre para continuar</Title> 
                        <Input label={'Email'} placeholder={" "} value={ formValue('identifier') } onChangeText={text => changeForm(text, 'identifier' )}/>
                        <Input label={'Senha'} secureTextEntry placeholder={" "} value={ formValue('password') } onChangeText={text => changeForm(text, 'password' )} onSubmitEditing={login} />
                        <Button link onPress={forgot}>Recuperar senha</Button>
                    </FormContent>
                    <Button invalid={!valid()} onPress={login} loading={loading}>Entrar</Button>
                    <Button outline onPress={createAccount}>Criar conta</Button>
                </Content> 
            </ContainerUnauthenticated> 
        </>
    )
}