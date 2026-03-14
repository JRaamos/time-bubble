import React, { useEffect } from "react";

import * as Linking from 'expo-linking'; 

import { navigate } from "@router/root";

export default function useDeeplink(){

    const initialLink = Linking.useURL();
    
    const action = (url) => {  
        let { path, queryParams } = Linking.parse(url);
        console.log('ACTION::Url', url, { path, queryParams })
        if(queryParams?.code){ 
            navigate('CreatePassword', queryParams)
        } 
    }; 
 
    useEffect(() => {  
        if(initialLink){ 
            setTimeout(() => action(initialLink), 1)
        }
    }, [initialLink]) 

    return {

    }
}