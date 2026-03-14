import React, { useState, createContext, useEffect } from 'react'
import { ReadObject, SaveObject } from '@services/storage'

import { day } from '@ui/themes/day'
 
export const CoreContext = createContext({})

export const CoreState = ({ children }) => {
    
	const [begining, setBegining] = useState(true)    
	const [darkmode, setDarkmode] = useState(null)
	const [notifications, setNotifications] = useState([])

	const [sidemenu, setSidemenu] = useState(false)  
	const [modal, setModal] = useState(null)   
	const [currentTheme, setCurrentTheme] = useState(day)

	const contextValue = {		
		currentTheme, setCurrentTheme,
		modal, setModal, 
		sidemenu, setSidemenu,
		darkmode, setDarkmode,
		notifications, setNotifications
	}

	const updateStore = async (type, value) => {
		if(!begining){
			await SaveObject(type, value)
		}
	} 
	useEffect(() => { readStore() ;}, []) 

    useEffect(() => { updateStore('darkmode', darkmode) ;}, [darkmode])

	const readStore = async () => { 
		setDarkmode(await ReadObject('darkmode'))  

		setBegining(false)
	} 


	return <CoreContext.Provider value={contextValue}>{children}</CoreContext.Provider>
}
