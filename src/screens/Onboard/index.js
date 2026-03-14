import React from 'react'  
import Carousel from 'react-native-snap-carousel';

import { 
    OnboardItem,
    OnboardAnimation,
    Content, 
    OnboardContentInfo,
    OnboardInfoTitle,
    OnboardInfoText,
    StepIndicatorContent,
    StepIndicator
} from './styled'   

import { 
    WindowScreen
} from '@ui/styled'   
 
import ContainerUnauthenticated from '@containers/Unauthenticated'
 
import Button from '@components/Form/Button'
import useController from './controller';

export default function Onboard(){   

    const {
        carouselRef,
        sliderWidth,
        activeStep, setActiveStep,
        steps,
        skip
    } = useController()
    
    const _renderItem = ({item, index}) => {
        return (
            <OnboardItem> 
                <OnboardAnimation source={item.animation} />
                <OnboardContentInfo>
                    <OnboardInfoTitle>{ item.title }</OnboardInfoTitle>
                    <OnboardInfoText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies iaculis auctor. Ut vel lorem congue felis facilisis pretium non nec mauris. Morbi placerat metus nisi, vitae ullamcorper ligula vestibulum ac. Sed sollicitudin sagittis nisi, a commodo massa vestibulum sit amet.
                    </OnboardInfoText>
                    <Button onPress={item.action}>{ item.label }</Button>
                </OnboardContentInfo>
            </OnboardItem>
        );
    }

    return (
        <>  
            <ContainerUnauthenticated keep noBack rightAction={(activeStep+1 < steps.length) ? { label:'Pular', action: () => skip() } : null }> 
                <Content> 
                    <Carousel
                        ref={carouselRef}
                        data={steps}
                        renderItem={_renderItem}
                        sliderWidth={WindowScreen.width}
                        itemWidth={sliderWidth}
                        onSnapToItem={index => setActiveStep(index)}
                    /> 
                    <StepIndicatorContent> 
                        {
                            steps.map((item, key) => 
                                <StepIndicator key={key} active={key === activeStep} onPress={() => carouselRef.current.snapToItem(key)} />
                            )
                        }
                    </StepIndicatorContent> 
                </Content> 
            </ContainerUnauthenticated> 
        </>
    )
}