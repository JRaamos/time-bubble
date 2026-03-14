import React, { useContext, useEffect, useState } from 'react'    

import {    
    ProfileContent,
    ProfileImage,
    ProfileImageIcon,
    ProfileAction,
    ProfileActionIcon,
    BodyText
} from './styled'   

import {  
    Content, Load, 
} from '@ui/styled'   
 
import ContainerAuthenticated from '@containers/Authenticated'   
import Input from '@components/Form/Input'  
import Button from '@components/Form/Button'  

import { parseStrapiImage } from '@utils'

import { RefreshControl } from 'react-native'

import moment from 'moment';
import 'moment/locale/pt-br';
import useController from './controller'

export default function Me(){     
    
    const {
        loading,
        init,
        setPreview,
        setFetching,
        fetching,
        preview,
        chooseOptions,
        user,
        confirmRemove,
        goBack
    } = useController() 

    return (
        <>  
            <ContainerAuthenticated noBack closeable={goBack} title={"Meu Perfil"} refreshControl={<RefreshControl refreshing={loading} onRefresh={init} />} >  
                <Content fluid>
                    <ProfileContent>
                        <ProfileImage onError={() => setPreview(null)} onLoadEnd={() => setFetching(false)} source={!!preview?.url ? { uri: parseStrapiImage(preview?.url) } : require('@assets/images/no-user.png')}>
                            {
                                ( fetching ) ? <Load  /> :
                                !!preview?.url ? null :
                                <ProfileImageIcon />
                            }
                        </ProfileImage>
                        <ProfileAction onPress={chooseOptions}>
                            <ProfileActionIcon />
                        </ProfileAction>
                    </ProfileContent>
                    <Content body filled>
                        <Input label={'Nome'} editable={false} placeholder={""} value={user?.name} disabled />
                        <Input label={'Email'} editable={false} placeholder={""} value={user?.email} disabled />

                        <BodyText>Usuário desde { moment(user.created_at).format('L') }</BodyText>

                        <Button loading={loading} outline spaced onPress={confirmRemove} >Excluir Conta</Button>
                    </Content>

                </Content> 
            </ContainerAuthenticated>   
        </>
    )
}