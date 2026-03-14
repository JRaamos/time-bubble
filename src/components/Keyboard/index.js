import React, { useState, useEffect } from "react";
import { Keyboard, View, Platform } from "react-native";
 
import { headerHeightIOS } from "@ui/styled";

import { UIManager, LayoutAnimation } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function KeyboardSafe(){

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => { 
        LayoutAnimation.spring(() => { });
        if(Platform.OS === 'ios'){
          setKeyboardHeight( e.endCoordinates.height - ( headerHeightIOS ) ); 
        }
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => { 
        LayoutAnimation.spring(() => { });
        setKeyboardHeight( 0 ); 
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={{ height: keyboardHeight }} />
  );
}  