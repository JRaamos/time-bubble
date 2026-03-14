import React from "react";

import {
    UploadTouch,
} from "./styled";

import { PickImage } from "@utils/pickers";

export default function UploadFile({ onChange, children }) {

    const action = async () => {
        const result = await PickImage()
        if(typeof onChange === 'function'){
            onChange?.(result)
        }
    }

    return (
        <>
            <UploadTouch onPress={action}>
                { children }
            </UploadTouch>
        </>
    );
}