import React, { useState, useEffect } from "react";
import { Keyboard, Platform } from "react-native";
 
import { headerHeightIOS } from "@ui/styled";
import { Spacer } from './styled';

export default function KeyboardSafe(){

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => { 
        if(Platform.OS === 'ios'){
          setKeyboardHeight( e.endCoordinates.height - ( headerHeightIOS ) ); 
        }
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => { 
        setKeyboardHeight( 0 ); 
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return <Spacer keyboardHeight={keyboardHeight} />;
}  
