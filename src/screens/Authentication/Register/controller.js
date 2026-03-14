import { useContext, useMemo, useState } from 'react'  
import { useNavigation } from '@react-navigation/native'

import Toast from 'react-native-toast-message'

import { DoLogin, DoRegister } from '@services/authentication'
import { exposeStrapiError } from '@utils'
import { isEmail, isPassword } from '@utils/validators'
import { AuthContext } from '@context/AuthContext'
import { UpdateMe } from '@services/me'

export default function useController(){

    const { navigate } = useNavigation() 
 
    const [ success, setSuccess ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ activeStep, setActiveStep ] = useState(0)

    const { reloadMe } = useContext(AuthContext)

    const [ form, setForm ] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : '' ;}
    const changeForm = ( value, ref ) => { setForm({ ...form, [ref]: value }) ;}

    const steps = useMemo(() => ([
        { title:"Dados pessoais", label:"Continuar" },
        { title:"Dados de acesso", label:"Criar" }
    ]), [])
 
    const back = () => { 
        if(activeStep - 1 > -1 && !success ){
            setActiveStep(activeStep - 1)
            return;
        }
        navigate('Login');
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

            if(!formValue('name') || !formValue('name').length){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'Informe o nome' }) ;}
                return false; 
            }
    
            if(!formValue('email') || !formValue('email').length){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'Informe o e-mail' }) ;}
                return false; 
            }  
            
            if(!isEmail(formValue('email'))){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'E-mail informado é inválido' }) ;}
                return false; 
            }  
            
        }

        if(activeStep === 1){

            if(!formValue('password') || !formValue('password').length){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'Informe a senha' }) ;}
                return false; 
            }

            if(!isPassword(formValue('password'))){ 
                if(verbose){ Toast.show({ type: 'error', text1: 'Senha informada não atende os requisitos' }) ;}
                return false; 
            }

        }  

        return true
    } 

    const action = async () => { 
        if(loading) return;
        
        setLoading(true)
        const payload = {
            username: form.email?.replace(/ /g,''),
            email: form.email?.replace(/ /g,''),
            password: form.password
        }
        const result = await DoRegister(payload)  
        if( result && !exposeStrapiError(result) ){     
            await makeAuth(payload)
            const datapayload = {
                name: form?.name
            }
            await UpdateMe(datapayload)
            afterLogin()
        }
        setLoading(false)
    }    
    

    const makeAuth = async (payload) => {
        const result = await DoLogin({ ...payload, identifier: payload?.email })
        if(result && !exposeStrapiError(result)){
            await reloadMe()
        } 
    }

    const afterLogin = () => {
        Toast.show({ type: 'success', text1: 'Conta criada com sucesso' }) 
        navigate('Login');
        // setSuccess({
        //     title:'Conta criada com sucesso',
        //     label:'Voltar para o login',
        //     action: back
        // })
    } 

    return {
        formValue,
        changeForm,
        next,
        back,
        steps,
        activeStep,
        success,
        loading
    }
}