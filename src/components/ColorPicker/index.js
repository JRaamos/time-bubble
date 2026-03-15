import React, { useCallback } from 'react'

import { sanitizeHexColor } from './utils'

import {
    PickerCard,
    PickerHeader,
    PickerHint,
    PickerLibrary,
    PickerMeta,
    PickerPanel,
    PickerPreview,
    PickerHue,
    PickerTitle,
    PickerValue,
} from './styled'

export default function ColorPicker({
    hint,
    label,
    last,
    onChange,
    onComplete,
    value,
}){
    const normalizedValue = sanitizeHexColor(value)

    const handleChange = useCallback(colors => {
        const nextHex = sanitizeHexColor(colors?.hex)
        onChange?.(nextHex)
    }, [onChange])

    const handleComplete = useCallback(colors => {
        const nextHex = sanitizeHexColor(colors?.hex)
        onComplete?.(nextHex)
    }, [onComplete])

    return (
        <PickerCard last={last}>
            <PickerHeader>
                <PickerTitle>{ label }</PickerTitle>
                <PickerValue>{ normalizedValue }</PickerValue>
            </PickerHeader>

            <PickerLibrary
                onChangeJS={handleChange}
                onCompleteJS={handleComplete}
                value={normalizedValue}
            >
                <PickerPanel />
                <PickerHue />
            </PickerLibrary>

            <PickerMeta>
                <PickerPreview previewHex={normalizedValue} />
                <PickerHint>{ hint }</PickerHint>
            </PickerMeta>
        </PickerCard>
    )
}
