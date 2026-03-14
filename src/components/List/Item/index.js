import React from 'react'  

import {  
    ListItemContent,
    ListInfo,
    ListItemText,
    ListActions,
    ListAction,
    ListActionIcon
} from './styled'     

import { findShowableParam } from '@utils'

export default function ListItem({ item, actions }){   

    const showableParam = findShowableParam(item)
    
    return (
        <>  
            <ListItemContent> 
                {
                    !actions ? <>
                        <ListInfo>
                            <ListItemText bold>ID</ListItemText>
                            <ListItemText>{ showableParam }</ListItemText>
                        </ListInfo>
                    </> : <>
                        <ListInfo>
                            <ListItemText bold>#{ item.id }</ListItemText>
                            <ListItemText>{ item?.[showableParam] }</ListItemText>
                        </ListInfo>
                        <ListActions>
                            {
                                actions.map((mit, key) => 
                                    <ListAction key={key} onPress={() => mit.action(item)}>
                                        <ListActionIcon icon={mit.icon} />
                                    </ListAction>
                                )
                            } 
                        </ListActions>
                    </>

                }
            </ListItemContent>  
        </>
    )
}