import React, { useState, useEffect } from 'react'   

import { 
    BigImage,
    RegularImage,
    RegularImageIcon,
    ImagesContent,
    ImagesWrap,
    InputLabel,
    InputPlaceholder,
    SelectedItemRemove,
    SelectedItemRemoveIcon,
    ContainerMany,
    ContainerManyWrapper,
    BigImageContent
} from './styled'   

import {  
    Touch,
    BodyAnimation  
} from '@ui/styled'    
 
import { PickImage } from '@utils/pickers'
import { parseStrapiImage } from '@utils'

export default function ImagePicker({ label, placeholder, selected, onChange, many }){  

    const [sending, setSending] = useState(null)
    const [preview, setPreview] = useState(null)

    const takeImage = async () => {
        setSending(true)
        const result = await PickImage()
        if(result?.id){
            if(many){
                setPreview( preview?.length ? [...preview, result] : [result])
            }else{
                setPreview(result)
            } 
            if( onChange && typeof onChange === 'function' ){
                if(many){
                    onChange( preview?.length ? [...preview, result] : [result])
                }else{
                    onChange(result)
                }
            }
        } 
        setSending(false)
        return result;
    } 

    const removeImage = (item) => { 
        if(many){ 
            if(onChange && typeof onChange === 'function'){
                onChange( preview?.length ? preview.filter(fit => fit.id != item.id ) : [] )
            }
            setPreview( preview?.length ? preview.filter(fit => fit.id != item.id ) : [] )
        }else{
            if(onChange && typeof onChange === 'function'){
                onChange(null)
            }
            setPreview(null)
        }
    }

    useEffect(() => {
        if((selected.id && selected.url) || (many && selected.length)){
            setPreview(selected)
        }
    }, [selected])

    return (
        <>      
            <ImagesContent >
                {
                    many ? <>
                        { label ? <InputLabel>{ label }</InputLabel> : null }
                        <ContainerMany>
                            {
                                sending ? 
                                    <BodyAnimation source={require('@assets/lotties/upload.json')} />
                                : <>
                                    <ContainerManyWrapper>
                                        {
                                            preview?.length ? 
                                                preview.map((item, key) => 
                                                    <RegularImage key={key} source={item?.url ? { uri:parseStrapiImage(item?.url) } : null }>
                                                        {
                                                            item?.id ? 
                                                                <SelectedItemRemove onPress={() => removeImage(item)}>
                                                                    <SelectedItemRemoveIcon />
                                                                </SelectedItemRemove>
                                                            : null 
                                                        }
                                                    </RegularImage>
                                                )
                                            : null
                                        }
                                        <Touch onPress={takeImage}>
                                            <RegularImage>
                                                <RegularImageIcon />
                                            </RegularImage>
                                        </Touch>
                                    </ContainerManyWrapper>
                                </>
                            }
                        </ContainerMany>
                    </> : <>
                        <Touch onPress={takeImage}>
                            {
                                ( preview?.url && preview?.id ) ? <>
                                    <BigImage source={ preview?.url ? { uri:parseStrapiImage(preview?.url) } : null }>
                                        {
                                            preview?.id ? 
                                                <SelectedItemRemove onPress={() => removeImage(false)}>
                                                    <SelectedItemRemoveIcon />
                                                </SelectedItemRemove>
                                            : null 
                                        }
                                        {
                                            sending ? 
                                                <BodyAnimation source={require('@assets/lotties/upload.json')} />
                                            : null
                                        }
                                    </BigImage>
                                </> : <>        
                                    { label ? <InputLabel>{ label }</InputLabel> : null } 
                                    <BigImageContent>
                                        {
                                            sending ? 
                                                <BodyAnimation source={require('@assets/lotties/upload.json')} />
                                            : <> 
                                                { placeholder ? <InputPlaceholder>{ placeholder }</InputPlaceholder> : null }
                                            </>
                                        }
                                    </BigImageContent>
                                </>
                            }
                        </Touch>
                    </>
                } 
            </ImagesContent> 
        </>
    )
}