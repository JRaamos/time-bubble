import { useMemo, useState } from 'react'  
import { useNavigation } from '@react-navigation/native'

import Toast from 'react-native-toast-message'

import { DoForgotPassword } from '@services/authentication'
import { exposeStrapiError } from '@utils'

export default function useController(){
    const { navigate } = useNavigation() 
 
    const [ success, setSuccess ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ activeStep, setActiveStep ] = useState(0)

    const [ form, setForm ] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : '' ;}
    const changeForm = ( value, ref ) => { setForm({ ...form, [ref]: value }) ;}

    const steps = useMemo(() => ([
        { title:"Informe seu email", label:"Recuperar" },
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
            if(!formValue('email') || !formValue('email').length){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'Preencha o campo: Email' }) ;}
                return false; 
            }  
        }  

        return true
    }

    const action = async () => { 
        if(loading) return;
        setLoading(true)
        const result = await DoForgotPassword({ email:formValue('email')?.replace(/\ /g,'') })  
        if( result && !exposeStrapiError(result) ){ 
            setSuccess({
                title:'Instruções para recuperação de senha foram enviadas o seu email',
                label:'Voltar para login',
                action: back
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