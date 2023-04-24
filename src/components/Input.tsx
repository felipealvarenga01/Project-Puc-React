import {InputProperties} from "../types";
export default function Input({type = 'text', placeholder, id, text}: InputProperties){
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={e => text(e.target.value)}
      />
    </>
  )
}