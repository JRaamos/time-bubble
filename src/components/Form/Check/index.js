import React from 'react'    

import {      
    SelectItem,
    SelectDecoration,
    SelectItemIcon,
    SelectItemText 
} from './styled'   
 
export default function FormCheck({onPress, active, children, title, white, centred }){    
    return (
        <>     
            <SelectItem onPress={onPress} white={white} active={!!active} centred={centred}>
                <SelectDecoration active={!!active} white={white}>
                    { !!active ? <SelectItemIcon white={white} /> : null }
                </SelectDecoration>
                {
                    title ? <SelectItemText white={white} active={!!active} >
                        { title }
                    </SelectItemText> : <>
                        { children }
                    </>
                }
            </SelectItem>
        </>
    )
}