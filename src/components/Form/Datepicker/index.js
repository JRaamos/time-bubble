import React, { useState } from 'react'    

import moment from 'moment';
import 'moment/locale/pt-br';

import {  
    InputContainer,
    InputLabel, 
    InputInput,
    InputMask, 

    CopyableContent,
    InputOut,

    ButtonCopy, 
    ButtonCalendar,
    CalendarCalendar

} from './styled'   
import { Platform } from 'react-native';

export default function Datepicker({ value, onChange, label, placeholder, type }){   

    const [date, setDate] = useState(value ? new Date(value) : new Date())
    const [mode, setMode] = useState( type ? type : 'date')
    const [visible, setVisible] = useState(false) 

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if(Platform.OS !== 'ios'){
            setVisible(false);
        }
        setDate(currentDate);
        if(Platform.OS === 'android' && type === 'datetime' && mode != 'time'){
            showTimepicker()
        }else{
            setMode( type ? type : 'date')
            if(onChange && typeof onChange === 'function'){
                onChange(currentDate)
            }
        }
    };
    
    const showMode = (currentMode) => {
        setVisible(true);
        setMode(currentMode);
    };
    
      const showTimepicker = () => {
        showMode('time');
      }; 
 
    return (
        <>   
            { label ? <InputLabel>{ label }</InputLabel> :  null }
            <InputContainer>
                <CopyableContent>
                    <InputOut> 
                        <InputInput placeholder={placeholder} editable={false} value={`${ ( type === 'date' || type === 'datetime' ) ? moment(date)?.format('L') : '' } ${ ( type === 'time' || type === 'datetime' ) ? moment(date)?.format('LT') : '' }`}/> 
                    </InputOut>  
                    <ButtonCopy onPress={toggleVisible}>
                        <ButtonCalendar visible={visible} type={type} />
                    </ButtonCopy>
                </CopyableContent> 
                {
                    visible ? <>
                        <CalendarCalendar 
                            value={date}
                            mode={mode}
                            onChange={onChangeDate} />
                    </> : null
                }

            </InputContainer>
        </>
    )
}