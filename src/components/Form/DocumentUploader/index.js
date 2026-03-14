import React, { useRef, useState } from 'react'    

import {
    HomeBodyCamera, 
    HomeItemContainer, 
    HomeBodyCameraActions,
    HomeBodyCameraGallery,
    HomeBodyCameraGalleryIcon,
    HomeBodyCameraButtonDecoration,
    HomeBodyCameraButton,
    HomeBodyCameraSpacer,
    HomeBodyCameraGalleryText,
    HomeBodyCameraPreview,
    FormSpacer
} from './styled'   

import {  
    Title,
    Load,
    ContentSpacer
} from '@ui/styled'   
  
import { PickImage } from '@utils/pickers'

import { useCameraPermissions } from 'expo-camera';
import { ServerUploadImage } from '@services/api';
import Button from '@components/Form/Button';
import { parseStrapiImage } from '@utils/index';

export default function DocumentUploader({ title, value, onChange }){      

    const [ taked, setTaked ] = useState(value)
    const [ loading, setLoading ] = useState(false) 
    const [ success, setSuccess ] = useState(false) 
     
    const cameraRef = useRef()
    const [permission, requestPermission] = useCameraPermissions();

    if(!permission || !permission?.granted){
        requestPermission()
    }
    
    const takeGallery = async () => {
        setLoading(true)
        const result = await PickImage()
        console.log("result gallery", result)
        
        setTaked(result)
        setLoading(false)
    }
    
    const takePhoto = async () => {
        setLoading(true)
        const result = await cameraRef?.current?.takePictureAsync()
        setTaked({ url: result.uri })

        const uploaded = await ServerUploadImage(result.uri);
        console.log("result photo", uploaded)
        
        setTaked(uploaded)
        setLoading(false)
    }

    const confirm = () => {
        setSuccess(true)
    }

    const complete = () => {
        if(typeof onChange === 'function'){
            onChange(taked)
        }
        clear()
    }

    const clear = () => { 
        setTaked(null)
    }

    return (
        <>   
            {
                success ? <>
                    <FormSpacer />
                    <Title medium centred>Imagem salva com sucesso!</Title>
                    <ContentSpacer />
                    <Button onPress={complete}>Fechar e continuar</Button>
                </> : taked ? <>
                    <Title medium>Tudo bem com esta imagem?</Title>
                    <HomeItemContainer>
                        <HomeBodyCameraPreview source={ !taked?.url ? null : { uri: parseStrapiImage(taked?.url)} } />
                    </HomeItemContainer>
                    {
                        loading ? <Load /> : <>
                            <Button onPress={confirm}>Sim, continuar</Button>
                            <Button outline onPress={clear}>Não, tirar outra</Button>
                        </>
                    }
                </> : <>
                    <Title medium>{title}</Title>
                    <HomeItemContainer>
                        <HomeBodyCamera ref={cameraRef} />
                    </HomeItemContainer>
                    {
                        loading ? <Load /> : 
                        <HomeBodyCameraActions>
                            <HomeBodyCameraGallery onPress={takeGallery}>
                                <HomeBodyCameraGalleryIcon />
                                <HomeBodyCameraGalleryText>
                                    Galeria
                                </HomeBodyCameraGalleryText>
                            </HomeBodyCameraGallery>
                            <HomeBodyCameraButtonDecoration onPress={takePhoto}>
                                <HomeBodyCameraButton>
                                </HomeBodyCameraButton>
                            </HomeBodyCameraButtonDecoration>
                            <HomeBodyCameraSpacer />
                        </HomeBodyCameraActions>
                    }
                </>
            }
        </>
    )
}