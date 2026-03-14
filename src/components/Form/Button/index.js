import React from 'react'  

import {   
    ButtonContent,
    ButtonText,
    ButtonIcon,
    LoadContent,
    ButtonCustom,
    LoadIndicator
} from './styled'   

export default function Button(props){   

    const appearance = props?.link ? 'ghost' : props?.outline ? 'outline' : 'filled'

    return <ButtonContent spaced={props?.spaced}>
            <ButtonCustom {...props} appearance={appearance}>
                { 
                    props?.loading ? <>
                        <LoadContent>
                            <LoadIndicator {...props} appearance={appearance} />
                        </LoadContent >
                    </> : <>
                        { props?.icon ? <ButtonIcon icon={props?.icon} /> : null }
                        <ButtonText {...props}>{ props?.children }</ButtonText>
                    </>
                }
            </ButtonCustom>
        </ButtonContent>
}