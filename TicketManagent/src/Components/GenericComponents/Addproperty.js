import React, { useState } from 'react'
import { SchemaTypes } from '../../Helper/Extraproperties';
import { blobToBase64 } from '../../Helper/helper';

export default function Addproperty(props) {
    const [error, setError] = useState("")
    var controlProps = {
        required: props.data.item.required,
        placeholder: props.data.item.displayName,
        onChange: async (e) => {
            if (props.data.item.type === SchemaTypes.file) {

                if (e.target.files[0].type !== "application/pdf") {
                    setError("")
                    let data = await blobToBase64(e.target.files[0])
                    props.onChange({ name: props.data.item.name, value: data });
                } else {

                    setError("Please Select the Image")
                }
            } else {
                props.onChange({ name: props.data.item.name, value: e.target.value });
            }
        },
    };
    switch (props.data.item.type) {
        case SchemaTypes.String:
            controlProps.type = SchemaTypes.String;
            break;
        case SchemaTypes.Number:
            controlProps.type = SchemaTypes.Number;
            break;
        case SchemaTypes.DATE:
            controlProps.type = SchemaTypes.DATE;
            break;
        case SchemaTypes.DROP_DOWN:
            controlProps.type = SchemaTypes.DROP_DOWN;
            break;
        case SchemaTypes.checkbox:
            controlProps.type = SchemaTypes.checkbox;
            break;
        case SchemaTypes.headline:
            controlProps.type = SchemaTypes.headline;
            break;
        case SchemaTypes.IMAGE:
            controlProps.type = SchemaTypes.IMAGE;
            break;
        case SchemaTypes.STD_DROPDOWN:
            controlProps.type = SchemaTypes.STD_DROPDOWN;
            break;
        case SchemaTypes.DIV_DROPDOWN:
            controlProps.type = SchemaTypes.DIV_DROPDOWN;
            break;
        case SchemaTypes.USER_LEVEL_DROPDOWN:
            controlProps.type = SchemaTypes.USER_LEVEL_DROPDOWN;
            break;

        case SchemaTypes.file:
            controlProps.type = SchemaTypes.file
            break;
        default:
            break;
    }


    if (controlProps.type === SchemaTypes.file) {
        return (
            <div className="relative">
                <input
                    accept={"image/png, image/jpeg"}
                    required={controlProps.required}
                    pattern={controlProps.pattern}
                    type={props.data.item.type}
                    min={props.data.item.min}
                    onChange={controlProps.onChange}
                    className="border mt-4 mb-4 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 "
                    placeholder={props.data.item.displayName}
                    defaultVal ue={props.currentValue}
                />
                {error}
            </div>
        )
    }

    return (
        <>
            <div className="relative">
                <input
                    required={controlProps.required}
                    pattern={controlProps.pattern}
                    type={props.data.item.type}
                    min={props.data.item.min}
                    onChange={controlProps.onChange}
                    className="border mt-4 mb-4 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 "
                    placeholder={props.data.item.displayName}
                    defaultValue={props.currentValue}
                />
            </div>
        </>
    )
}
