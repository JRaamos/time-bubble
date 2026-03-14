import { useCallback, useEffect, useState } from "react";

import { Wrapper, MapContainer, DisableLayer } from "./styled";
import { Circle } from "react-native-maps";

export default function MapPicker({
  initialCenter = { latitude: -23.5505, longitude: -46.6333 },
  radius = 1000,
  value,
  onChange,
  disabled,
}) {

  const [position, setPosition] = useState( value ? { latitude: value?.lat, longitude: value?.lng } : initialCenter );

  const emitChange = useCallback(
    (pos) => {
      onChange?.({
        ...pos,
        radius,
      });
    },
    [onChange, radius]
  );

  const handleMapPress = useCallback(
    (event) => {
      if (disabled) return;

      const { latitude, longitude } = event.nativeEvent.coordinate;
      emitChange({ lat: latitude, lng: longitude });

    },
    [disabled, emitChange]
  );
  
  useEffect(() => { if (!value) return; setPosition({ latitude: value?.lat, longitude: value?.lng }); }, [value]);

  return (
    <Wrapper>
      <MapContainer
        // pointerEvents={disabled ? "none" : "auto"}
        region={{
          ...position,
          latitudeDelta: 1.05,
          longitudeDelta: 1.05,
        }}
        onPress={handleMapPress}
      >
        

        <Circle
          center={{
            ...position,
          }}
          radius={radius}
          fillColor="rgba(63, 6, 135, 0.15)"
          strokeColor="rgba(63, 6, 135, 0.8)"
        />
      </MapContainer>

      {disabled && <DisableLayer />}
    </Wrapper>
  );
}
