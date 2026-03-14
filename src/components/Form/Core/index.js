import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";

import Toast from "react-native-toast-message";
import { faker } from '@faker-js/faker';

import {
    FormInput,
    FormWrapper,
    FormSeparator,
    ContentFormHeader,
    ContentForm,
    UploadContent,
    InputRequired,
    AutofillButton,
    AutofillButtonIcon,
    ContentFormHeaderText,
} from "./styled";

import Input, { CurrencyInput, MaskedInput } from "@components/Form/Input";
import Select from "@components/Form/Select";
import PasswordValidation from "@components/Form/PasswordValidation";
// import UploadFile from "../UploadFile";
// import DashboardFormMultiSelect from "../MultiSelect";
// import DashboardFormMultiForm from "../MultiForm";
import Check from "../Check";
import Toggle from "../Toggle";

import { Load, LoadCenter } from "@ui/styled";

import { generateCPF, isImage, normalizeStrapiList } from "@utils";
import { DEVELOPMENT_MODE } from "@services/api";
import { Read } from "@services/core";
import FormRadio from "../Radio";
import MapPicker from "../MapPicker";
import DashboardFormMultiSelect from "../MultiSelect";
import DashboardFormMultiForm from "../MultiForm";
import UploadField from "../UploadField";

const keywordFakerMap = [
    { keyword: 'cpf', generate: () => generateCPF() },
    { keyword: 'name', generate: () => faker.person.fullName() },
    { keyword: 'email', generate: () => faker.internet.email({ provider: 'uorak.com' }) },
    { keyword: 'age', generate: () => faker.number.int({ min: 18, max: 65 }).toString() },
    { keyword: 'phone', generate: () => faker.phone.number() },
    { keyword: 'address', generate: () => faker.location.streetAddress() },
    { keyword: 'company', generate: () => faker.company.name() },
    // { keyword: 'password', generate: () => faker.internet.password() },
    { keyword: 'description', generate: () => faker.lorem.sentence() },
    { keyword: 'password', generate: () => `Faker@123` },
    { keyword: 'cpassword', generate: () => `Faker@123` },
];

const customTypes = [
    "checkbox",
    "toggle",
    "radio",
    "upload",
    "map",
]

export default forwardRef(function FormCore({ formItems, register, disabled, title, nospace, flat }, ref) {

    const [form, setForm] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
    const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

    const [nextBlur, setNextBlur] = useState(null)
    const [nextPrint, setNextPrint] = useState([])
    const [loading, setLoading] = useState(false)

    const scheduleBlur = (item) => {
        setTimeout(() => { setNextBlur(item); }, 1)
    }

    const safeBlur = (item) => {
        if (typeof item?.onBlur === "function") {
            item.onBlur()
        }
    }

    const handleAutoFill = () => {
        const fakeData = {};
        nextPrint?.filter(f => f?.ref && !f?.formItems && f?.type !== 'upload').forEach((field) => {
            fakeData[field?.ref] = field?.options ? (
                    field?.multi ? 
                  [ field?.options?.[Math.floor(Math.random() * field?.options?.length)]?.id ] :
                    field?.options?.[Math.floor(Math.random() * field?.options?.length)]?.id
            ) : smartFaker(field);
        });
        setForm({ ...fakeData, ...form });
    };

    const smartFaker = (field) => {
        const fieldName = field?.ref
        const fieldType = field?.type
        const fieldMask = field?.mask
        const fieldOptionsMask = field?.maskOptions?.mask

        if (fieldMask?.length) {
            if(fieldMask === "custom" && (fieldOptionsMask === "AAA-9S99" || fieldOptionsMask === "AAA-9*99")) return "AAA-1B00"
            if(fieldMask === "cel-phone") return faker.phone.number()
            const fieldSize = fieldMask?.replace(/\D/g, '')?.length
            let range = `1`;
            for (let i = 1; i < fieldSize; i++) { range = `${range}0`; }
            const rangeBegins = parseInt(`${range}`)
            const rangeEnds = parseInt(`${range}0`) - 1
            const nextvalue = faker.number.int({ min: rangeBegins, max: rangeEnds }).toString()
            return nextvalue
        }

        if (fieldType === "toggle" || fieldType === "checkbox") {
            return true
        }

        if (fieldType === "number") {
            return faker.number.int({ min: 100, max: 1000 }).toString()
        }

        if (fieldType === "money") {
            return faker.number.int({ min: 10000, max: 100000 }).toString()
        }

        if (fieldType === "date") {
            return new Date()?.toISOString()?.split("T")?.[0]
        }

        if (fieldType === "time") {
            return (new Date()?.toISOString()?.split("T")?.[1])?.substring(0, 5)
        }

        if (fieldType === "map") {
            return { lat: -23.5505, lng: -46.6333, radius: 5000 }
        }

        const match = keywordFakerMap.find(({ keyword }) =>
            fieldName?.toLowerCase()?.includes(keyword)
        );

        return match ? match.generate() : faker.word.sample();
    };

    const fillStrapiOptions = async (fi) => {
        const promises = fi?.filter(f => f?.strapi?.table)?.map(async (it) => {
            const res = await Read(it?.strapi?.table, null, null, [`${it?.strapi?.ref}:asc`])
            const nres = normalizeStrapiList(res)
            return {
                ...it,
                options: nres?.map(m => ({
                    ...m,
                    id: m?.documentId,
                    title: m?.[it?.strapi?.ref]
                }))
            }
        })
        const filled = await Promise.all(promises)
        return fi?.map(m => filled?.find(ff => ff?.ref === m?.ref) ?? m)
    }

    const refillStrapiOptions = fi => {
        return fi?.map(m => m?.strapi?.table ? ({
            ...m,
            options: (nextPrint?.find(f => f?.strapi?.table === m?.strapi?.table)?.options || [])
        }) : m)
    }

    const processNextItems = async () => {
        if (loading) return;

        if (formItems?.filter(f => f?.strapi?.table)?.length === nextPrint?.filter(f => f?.strapi?.table && f?.options)?.length) {
            const next = refillStrapiOptions(formItems)
            setNextPrint(next)
            return;
        }

        setLoading(true)
        const next = await fillStrapiOptions(formItems)
        setNextPrint(next)
        setLoading(false)
    }

    useEffect(() => {
        if (register) {
            setForm({ ...register })
        }
    }, [register])

    useEffect(() => {
        if (nextBlur) { safeBlur(nextBlur) ;}
    }, [nextBlur])

    useEffect(() => {
        processNextItems()
    }, [formItems])

    const valid = (payload, array) => {
        for (let item of array) {
            if (item?.ref && !payload?.[item?.ref] && item?.required) {
                Toast.show({ type:'error',  text1:`O campo ${item?.label || item?.placeholder || item?.ref} é obrigatório.`})
                return false;
            }
            if (item?.ref && item?.validate && !item?.validate(payload?.[item?.ref])) {
                return false;
            }
        }
        return true;
    };

    useImperativeHandle(ref, useCallback(() => ({
        getForm(skip = false) {
            if (!skip && !valid(form, formItems)) { return; }
            return form;
        },
        getFormOptions(ref) {
            return nextPrint?.find(f => f.ref === ref)?.options
        },
    }), [form, formItems, nextPrint]))

    return (
        <>
            <ContentForm active={!!title}>
                <ContentFormHeader active={!!title}>
                    <ContentFormHeaderText active={!!title}>{title}</ContentFormHeaderText>
                </ContentFormHeader>
                <FormWrapper nospace={nospace}>
                    {
                        loading ? <LoadCenter><Load outline /></LoadCenter> :
                            nextPrint.map((item, key) => <>
                                {
                                    item.separator ? <FormSeparator /> : <FormInput full={item.full} half={item.half} quarter={item.quarter} twenty={item.twenty} key={key} fit={item?.fit} twothree={item?.twothree}>

                                        { item.custom ? item.custom : null }
                                        { !item.custom && item.options && item?.multi ? <DashboardFormMultiSelect required={item?.required || !!item?.validate} forwardRef={item.ref} placeholder={item.placeholder} label={item?.label} options={item.options} value={formValue(item.ref)} onChange={val => { changeForm(val, item.ref); scheduleBlur(item); }} disabled={item.disabled || disabled} full={item.full} multi={item?.multi} /> : null }
                                        { !item.custom && item.options && !item?.multi ? <Select required={item?.required || !!item?.validate} multirequired={item?.multirequired} placeholder={item.placeholder} label={item?.label} options={item.options} selected={formValue(item.ref)} onChange={val => { changeForm(val, item.ref); scheduleBlur(item); }} disabled={item.disabled || disabled} small={item?.small} param={"title"} /> : null }
                                        { !item.custom && !item.options && item.formItems ? <DashboardFormMultiForm title={item.title} placeholder={item.placeholder} label={item?.label} value={formValue(item.ref)} onChange={e => changeForm(e, item.ref)} formItems={item.formItems} /> : null }
                                        
                                        { !item.custom && !item.options && !item.formItems && !item.mask && item.passwordValidation ? <PasswordValidation password={form.password} /> : null }
                                        { !item.custom && !item.options && !item.formItems && !item.mask && !item.passwordValidation && item.type === 'radio' ? <FormRadio placeholder={item.placeholder} title={item?.label} label={item?.placeholder} active={formValue(item.ref)} onPress={() => changeForm(!formValue(item.ref), item.ref)} disabled={item.disabled || disabled} /> : null }
                                        { !item.custom && !item.options && !item.formItems && !item.mask && !item.passwordValidation && item.type === 'toggle' ? <Toggle placeholder={item.placeholder} title={item?.label} label={item?.placeholder} value={formValue(item.ref)} onChange={val => changeForm(val, item.ref)} disabled={item.disabled || disabled} reverse={item.reverse} /> : null }
                                        { !item.custom && !item.options && !item.formItems && !item.mask && !item.passwordValidation && item.type === 'checkbox' ? <Check placeholder={item.placeholder} title={item?.label} label={item?.placeholder} active={formValue(item.ref)} onPress={() => changeForm(!formValue(item.ref), item.ref)} disabled={item.disabled || disabled} /> : null }
                                        { !item.custom && !item.options && !item.formItems && !item.mask && !item.passwordValidation && item.type === 'map' ? <MapPicker value={formValue(item.ref)} onChange={value => { changeForm(value, item.ref) ; typeof item?.onBlur === "function" ? item.onBlur(formValue(item.ref)) : null }} disabled={item.disabled || disabled} /> : null }
                                        { !item.custom && !item.options && !item.formItems && !item.mask && !item.passwordValidation && item.type === 'upload' ? <UploadField item={item} formValue={formValue} changeForm={changeForm} squared={item?.squared} /> : null }

                                        { !item.custom && !item.options && !item.formItems && !item.passwordValidation && !customTypes?.includes(item.type) ? <Input required={item?.required || !!item?.validate} secureTextEntry={item.type === 'password' || item.secureTextEntry} textarea={item.type === 'textarea'} placeholder={item.placeholder} label={item?.label} value={formValue(item.ref)} onChangeText={value => changeForm(value, item.ref)} editable={!(item.disabled || disabled)} onSubmitEditing={item.onSubmitEditing} onBlur={() => typeof item?.onBlur === "function" ? item.onBlur(formValue(item.ref)) : null} mask={item?.type === 'money' ? 'money' : item?.mask} options={ item?.type === "money" ? { precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' } : item?.maskOptions } returnKeyType={item?.mask ? 'done' : item?.returnKeyType} copyable={item?.copyable} /> : null }

                                    </FormInput>
                                }
                            </>
                            )
                    }
                </FormWrapper>
                {
                    !DEVELOPMENT_MODE || flat ? null :
                        <AutofillButton onPress={handleAutoFill}>
                            <AutofillButtonIcon />
                        </AutofillButton>
                }
            </ContentForm>
        </>
    );
})