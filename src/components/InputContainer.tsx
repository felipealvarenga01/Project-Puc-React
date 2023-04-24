import Label from "./Label";
import Input from "./Input";
import {InputProperties} from "../types";
import {useState} from "react";

export default function InputContainer({type = 'text', placeholder, id, textLabel, text}: InputProperties) {
    const [data, setData] = useState('');
    return (
        <div className="label-container">
            <Label htmlFor={id} text={textLabel}/>
            <Input type={type} id={id} text={(data: string) => text(data)} placeholder={placeholder}/>
        </div>
    )
}