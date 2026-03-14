import { useMemo, useState } from 'react'  
import { useNavigation, useRoute } from '@react-navigation/native'

import Toast from 'react-native-toast-message'

import { DoResetPassword } from '@services/authentication'
import { exposeStrapiError } from '@utils'

export default function useController(){
    const { navigate } = useNavigation() 
 
    const { params } = useRoute()
 
    const [ success, setSuccess ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ activeStep, setActiveStep ] = useState(0)

    const [ form, setForm ] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : '' ;}
    const changeForm = ( value, ref ) => { setForm({ ...form, [ref]: value }) ;}

    const steps = useMemo(() => ([
        { title:"Crie sua senha", label:"Criar" },
    ]), [])

    const back = () => { 
        if(activeStep - 1 > -1 && !success ){
            setActiveStep(activeStep - 1)
            return;
        }
        navigate('Login') ;
    }

    const next = () => {
        if(!valid(true)){ return; }
        if( activeStep + 1 < steps.length ){
            setActiveStep(activeStep + 1)
            return;
        }
        action()
    }

    const valid = (verbose = false) => { 
        
        if(activeStep === 0){
            if(!formValue('password') || !formValue('password').length){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'Preencha o campo: Senha' }) ;}
                return false; 
            } 
            
            if(!formValue('cpassword') || !formValue('cpassword').length){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'Preencha o campo: Confirmar senha' }) ;}
                return false; 
            } 
            
            if( formValue('password') !== formValue('cpassword')){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'Nova senha e confirmar nova senha devem ser iguais' }) ;}
                return false; 
            } 
        } 

        return true
    }

    const action = async () => { 
        if(loading) return;
        setLoading(true)
        const result = await DoResetPassword({
            code: params.code,
            password: formValue('password'),
            passwordConfirmation: formValue('cpassword')
        })  
        if( result && !exposeStrapiError(result) ){ 
            setSuccess({
                title:'Senha criada com sucesso',
                label:'Voltar para o login',
                action:back
            })
        }
        setLoading(false)
    }

    
    return {
        back,
        next,
        formValue,
        changeForm,
        steps,
        activeStep,
        loading,
        success
    }
}