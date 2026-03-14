import React, { useState } from 'react'  
import Toast from 'react-native-toast-message'

import Button from '@components/Form/Button'
import FormSuccess from '../Success'

export default function SuccessableForm({ children, label, valid, action, success }){    

    const [alright, setAlright] = useState(false) 
    const [loading, setLoading] = useState(false) 

    const next = async () => {
        if(!valid(true)){ return ;}
        if(action && typeof action === 'function'){ 
            setLoading(true)
            const result = await action();
            setLoading(false)
            if( !result.success ){ return ;}
        }
        Toast.show({ type: 'success', text1: success.title })
        setAlright(true)
    }

    return (
        <>   
            {
                alright ? <>
                    <FormSuccess success={success} />
                </> : <> 
                    { children }
                    <Button loading={loading} invalid={!valid()} onPress={next}>{label}</Button> 
                </>
            } 
        </>
    )
}