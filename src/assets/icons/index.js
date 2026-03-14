import * as React from 'react';
import {Svg} from 'react-native-svg';
 
  
import { comum } from './comum';   
import { project } from './project';   
 

const icons = {   
    ...comum,
    ...project
};

export default (props) =>
  props.icon && icons[props.icon] ? (
    <Svg
        viewBox={icons[props.icon].viewBox}
        width={props.width ? props.width : 30}
        height={props.height ? props.height : 30}
        style={props.style}
        fill={props.fill ? props.fill : 'transparent'}
        stroke={props.stroke ? props.stroke : 'transparent'}
        line={props.line ? props.line : null}>
        {icons[props.icon].svg}
    </Svg>
  ) : null;
