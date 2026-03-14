import { useContext, useEffect, useState } from 'react'    
import Toast from 'react-native-toast-message'

import { useNavigation } from '@react-navigation/native'

import { DoLogout } from '@services/authentication'
import { PickImage } from '@utils/pickers' 

import { CoreContext } from '@context/CoreContext'
import { AuthContext } from '@context/AuthContext'

import { ReadMe, RemoveMe, UpdateMe } from '@services/me'

export default function useController(){     
    const { navigate, goBack } = useNavigation() 
    
    const { setNotifications, setModal } = useContext(CoreContext)
    const { user, setUser } = useContext(AuthContext)
   
    const [preview, setPreview] = useState(user.image ?? null)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    const exit = async () => {  
        await DoLogout() 
        setPreview(null)
        setNotifications(null)
        navigate('Login');
    } 

    const chooseOptions = () => {
        setModal({
            type:'options',
            actions: preview?.url ? [
                { label:'Alterar Foto', action: () => takePic() },
                { label:'Remover Foto', outline:true, accent:true, action: () => removePic() },
            ] : [
                { label:'Adicionar Foto', action: () => takePic() }
            ]
        })
    }

    const confirmRemove = () => {
        setModal({
            type:'options',
            text:'Deseja excluir sua conta?',
            actions: [
                { label:'Sim, excluir conta', outline:true, accent:true, action: () => removeAccount() },
                { label:'Não excluir', outline:true, action: () => null },
            ]
        })
    }

    const takePic = async () => {
        setFetching(true) 
        const result = await PickImage()
        if(result?.id){
            await UpdateMe({ image: result.id })
            setPreview(result)
        } 
    }
    
    const removePic = async () => {
        await UpdateMe({ image: null })
        setPreview(null)
    }

    const init = async () => {
        setLoading(true)
        const result = await ReadMe()
        if(result?.id){
            setUser(result)
            if(result?.image?.url){ setPreview(result?.image); }
        }
        setLoading(false)
    }

    const removeAccount = async () => {
        setLoading(true)
        await RemoveMe();
        Toast.show({ type: 'error', text1: 'Conta excluida com sucesso' })
        exit();
        setLoading(false)
    }

    useEffect(() => {
        init()
    },[])

    return {
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
    }
}