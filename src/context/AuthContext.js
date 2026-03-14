import React, { useState, createContext, useEffect } from 'react'
import { ReadObject, SaveObject } from '@services/storage'  
import { ReadMe } from '@services/me'
 
export const AuthContext = createContext({})

export const AuthState = ({ children }) => {
     
	const [begining, setBegining] = useState(true)    

	const [user, setUser] = useState(null) 
	const [faceId, setFaceId] = useState(null)

    const reloadMe = async () => {
        const result = await ReadMe()
        if(result?.id){
            setUser(result)
        } 
		return result
    }
    

	const contextValue = {
		user, setUser,
		faceId, setFaceId,
		reloadMe
	}
	const updateStore = async (type, value) => {
		if(!begining){
			await SaveObject(type, value)
		}
	}

	useEffect(() => { readStore() ;}, []) 
 
    useEffect(() => { updateStore('user', user) ;}, [user])   

	const readStore = async () => { 
		setUser(await ReadObject('user'))  

		setBegining(false)
	} 

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}