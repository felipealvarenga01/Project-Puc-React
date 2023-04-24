import {LabelProperties} from "../types";

export default function Label({htmlFor, text}:LabelProperties){
  return (
    <label htmlFor={htmlFor}>{text}</label>
  )
}