import { useRef, useState } from 'react'  
import { useNavigation } from '@react-navigation/native'

import { 
    WindowScreen
} from '@ui/styled'   
 
export default function useController(){   

    const { navigate } = useNavigation() 
    const carouselRef = useRef()

    const sliderWidth = WindowScreen.width - 24

    const [activeStep, setActiveStep] = useState(0)

    const steps = [
        { title: 'Ágil', animation:require('@assets/lotties/fast.json'), label:'Próximo' , action:() => next()},
        { title: 'Seguro', animation:require('@assets/lotties/secure.json'), label:'Próximo' , action:() => next()},
        { title: 'Forte', animation:require('@assets/lotties/runner.json'), label:'Próximo' , action:() => next()},
        { title: 'Inteligente', animation:require('@assets/lotties/smart.json'), label:'Próximo' , action:() => next()},
        { title: 'Amigavel', animation:require('@assets/lotties/friendly.json'), label:'Próximo' , action:() => next()},
        { title: 'Multiplataforma', animation:require('@assets/lotties/multiplataform.json'), label:'Próximo' , action:() => next()},
        { title: 'Vamos codar', animation:require('@assets/lotties/letscode.json'), label:'Começar agora', action:() => skip() }
    ]

    const next = () => {
        carouselRef.current.snapToNext()
    }

    const skip = () => {
        navigate('Login')
    }

    return {
        carouselRef,
        sliderWidth,
        activeStep, setActiveStep,
        steps,
        next,
        skip
    }
}