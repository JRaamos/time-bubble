import React from "react";

import {
    UploadContent,
    InputRequired,
    UploadContentText,
} from "./styled";

import UploadFile from "../UploadFile"; 
import { isImage, parseStrapiImage } from "@utils"; 

export default function UploadField({ item, formValue, changeForm, squared }) {

    return (
        <>
            <UploadFile value={formValue(item.ref)} onChange={value => changeForm(value, item.ref)} >
                <UploadContent squared={squared} source={formValue(item.ref)?.url ? {uri:parseStrapiImage(formValue(item.ref)?.url)} : null}>
                    <UploadContentText>
                        {formValue(item.ref) ? (!isImage(formValue(item.ref)?.ext) ? formValue(item.ref)?.name : null) : item.placeholder}
                    </UploadContentText>
                    {item?.required && !formValue(item.ref) ? <InputRequired> * </InputRequired> : null}
                </UploadContent>
            </UploadFile>
        </>
    );
}