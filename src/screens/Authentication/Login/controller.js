import { useState, useContext } from 'react'  
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

import { AuthContext } from '@context/AuthContext'

import { DoLogin } from '@services/authentication'
import { exposeStrapiError } from '@utils'
import { useFaceId } from '@hooks/useFaceId'

export default function useController(){
    const { navigate } = useNavigation() 

    const [ loading, setLoading ] = useState(false)
    const { reloadMe } = useContext(AuthContext)
    
    const { askFaceId } = useFaceId()
    
    const [ form, setForm ] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : '' ;}
    const changeForm = ( value, ref ) => { setForm({ ...form, [ref]: value }) ;}

    const forgot = () => { navigate('Forgot') ;}
    const createAccount = () => { navigate('Register') ;} 

    const valid = (verbose = false) => {  

        if(!formValue('identifier') || !formValue('identifier').length){ 
            if(verbose){ Toast.show({ type: 'error', text1: 'Preencha o campo: Email' }) ;}
            return false; 
        }  

        if(!formValue('password') || !formValue('password').length){ 
            if(verbose){ Toast.show({ type: 'error', text1: 'Preencha o campo: Senha' }) ;}
            return false; 
        }  

        return true
    } 

    const login = async () => {
        if(!valid(true) || loading){ return ;}
        setLoading(true)
        const result = await DoLogin({ ...form, identifier: form.identifier?.replace(/\ /g,'') })  
        if(result && !exposeStrapiError(result)){
            await reloadMe()
            completeLogin()
        } 
        setLoading(false)
    }

    const completeLogin = async () => {
        const can = await askFaceId()
        if(can) navigate('Home');
    }

    return {
        valid,
        login,
        loading,
        forgot,
        formValue,
        changeForm,
        createAccount
    }
}