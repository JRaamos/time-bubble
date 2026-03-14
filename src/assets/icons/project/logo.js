import React from 'react';
import { G, Path, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';

export default {
  svg: (  
    <G>  
        <G clipPath="url(#clip0)">
          <Path fill="url(#paint0_linear)" d="M68.6 24.3C62.3 20.8 25.6 1.2 24.7.7c-2.1-1.2-4.6-.7-6 1.1-1 1.3-1.6 4 .6 6.1.7.7 26.3 22.9 26.3 22.9l-28.9 24s.2-4.7.2-5.3c0-2.2-1.5-4.8-4.4-4.9-2 0-3.1.7-4 2.1 0 0-7.2 14.2-7.9 15.8-1.1 2.8-.2 6.1 1.7 7.9 2.6 2.5 6 2.6 8.7 1.2 14.5-7.8 47.3-27.9 57.8-34.5 2.4-1.5 3.7-3.7 3.7-6.3-.2-3-1.7-5.3-3.9-6.5z" />
        </G>
        <Defs>
          <LinearGradient id="paint0_linear" x1="0" x2="72.346" y1="36.26" y2="36.26" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F27C36" />
            <Stop offset="1" stopColor="#ED485F" />
          </LinearGradient>
          <LinearGradient id="paint1_linear" x1="122.281" x2="127.858" y1="30.645" y2="30.645" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F27C36" />
            <Stop offset="1" stopColor="#ED485F" />
          </LinearGradient>
          <ClipPath id="clip0">
            <Path fill="#fff" d="M0 0h256v72.5H0z" />
          </ClipPath>
        </Defs>
    </G>
  ),
  viewBox: "0 0 73 73"
}     