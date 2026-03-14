import React, { useState, useEffect } from 'react'   

import { 
    WrapperSelected,
    SelectedItem,
    SelectedItemText,
    SelectedItemRemove,
    SelectedItemRemoveIcon,
    LoadContainer
} from './styled'   

import { 
    Load
} from '@ui/styled'    

import Select from '@components/Form/Select'  
import { Read } from '@services/core'  
import { findShowableParam, normalizeStrapiList } from '@utils'   

export default function SelectRelation({ label, placeholder, selected, onChange, table, many }){    
 
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [showableParam, setShowableParam] = useState(null)

    const [currentSelected, setCurrentSelect] = useState(null)
    const [currentSelecteds, setCurrentSelects] = useState([])

    const init = async () => {
        setLoading(true)
        const result = await Read(table)
        const resultload = normalizeStrapiList(result)
        setLoading(false)
        if(resultload?.length){
            setShowableParam( findShowableParam(resultload[0]) )
            setOptions(resultload)
        }
    }

    const handleChange = (item) => {
        if(onChange && typeof onChange === 'function'){
            if(many){
                const pickeds = currentSelecteds?.length ? [...currentSelecteds, item] : [item]
                onChange(pickeds) 
                setCurrentSelects(pickeds) 
                setCurrentSelect(null)
            }else{
                onChange(item)
            }
        }
    }

    const remove = (item) => {
        const pickeds = currentSelecteds?.length ? currentSelecteds.filter(fit => fit.id != item.id) : []
        onChange(pickeds) 
        setCurrentSelects(pickeds) 
    }

    const filterAdded = item => { 
        return !many || (many && !currentSelecteds.map(mit => mit.id).includes(item.id))
    }

    useEffect(() => { init() ;}, [table]) 
    useEffect(() => { 
        if(selected){    
            if(!many){ 
                setCurrentSelect(selected) ; 
            }else{    
                setCurrentSelects( selected?.length ? selected : [] ) 
            }
        }
    }, [selected])  
    
    return (
        <>   
            {
                loading ? <>
                    <LoadContainer>
                        <Load /> 
                    </LoadContainer>
                </> : <>
                    <Select {...{ label, placeholder }} selected={ currentSelected } onChange={handleChange} options={options.filter(filterAdded)} param={showableParam} />
                    {
                        many && currentSelecteds?.length ? <>
                            <WrapperSelected>
                                {
                                    currentSelecteds?.map((item, key) =>
                                        <SelectedItem key={key}>
                                            <SelectedItemText>
                                                { item[showableParam] }
                                            </SelectedItemText>
                                            <SelectedItemRemove onPress={() => remove(item)}>
                                                <SelectedItemRemoveIcon />
                                            </SelectedItemRemove>
                                        </SelectedItem>
                                    )
                                }
                            </WrapperSelected>
                        </> : null
                    }
                </>
            } 
        </>
    )
}