import React, { useMemo, useState } from 'react'   

import {   
    ContainerInput,
    InputLabel,
    InputContent,
    InputContentHeader,
    InputContentHeaderInput,
    InputInput, 
    InputInputSelect,
    InputIcon,
    InputTextDecoration,
    SearchIcon,
    InputSearchContent,
    InputContentOptions,
    Option,
    OptionText
} from './styled'  
 
import { UIManager, LayoutAnimation } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Select(props){    

    const [open, setOpen] = useState(false)
    const [filterExpression, setFilterExpression] = useState('') 

    const toggleSelect = () => {
        LayoutAnimation.spring(() => { });
        setOpen(!open)
    }

    const select = item => {
        if(props.onChange && typeof props.onChange === 'function'){
            props.onChange(item?.id || item)
        }
        toggleSelect()
    }

    const filterFinded = fit => { 
        const ref = props.param ? fit[props.param] : fit
        return ( !filterExpression || `${ ref}`?.toLowerCase().indexOf(`${ filterExpression }`?.toLowerCase()) !== -1 )
    }

    const selected = useMemo(() => {
        return props?.options?.length && props.selected ? props.options.find(f => f.id === props.selected) : null
    }, [props.selected, props.options])

    return (
        <>   
            <ContainerInput>
                { props.label ? <InputLabel>{ props.label }</InputLabel> : null }
                <InputContent purple={open || !!props.selected}>

                    <InputContentHeader onPress={ toggleSelect }>
                        
                        {
                            open || !props.options ? null : <>
                                <InputInputSelect purple={!!selected}>{ selected ? props.param ? selected[props.param] : typeof selected === 'string' ? selected : '' : props.placeholder }</InputInputSelect>
                                <InputIcon  purple={!!selected} /> 
                            </>
                        }  

                        {/* {
                            !open ? null : <>
                                <InputSearchContent>
                                    <InputInput 
                                        placeholder={ 'Search' } 
                                        value={ filterExpression } 
                                        onChangeText={ text => setFilterExpression(text) } 
                                    />
                                    <SearchIcon />
                                </InputSearchContent>
                            </>
                        } */}

                    </InputContentHeader>

                    {
                        !open ? null :
                        <InputContentOptions>
                            {
                                props.options?.filter(filterFinded)?.map((item, key) => 
                                    <Option key={key} onPress={() => select(item)}>
                                        <OptionText>{ props.param ? item[props.param] : item }</OptionText>
                                    </Option> 
                                )
                            }
                        </InputContentOptions> 
                    } 

                </InputContent>
            </ContainerInput>
        </>
    )
}