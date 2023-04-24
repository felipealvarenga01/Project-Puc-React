import InputContainer from "../components/InputContainer";
import {useEffect, useState} from "react";
import {createUser} from "../services/api";
import {SpinnerInfinity} from 'spinners-react';
import {useNavigate} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

function Cadastro() {
    const [loading, setLoading] = useState(false)
    const [nome, setNome] = useState('')
    const [sobreNome, setSobreNome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [buttonEnable, setButtonEnable] = useState(false)
    const navigate = useNavigate()

    async function cadastrarUsuario() {
        setLoading(true)
        await createUser({nome, sobreNome, dataNascimento, email, senha})
        setLoading(false)
        navigate('/login')
    }

    useEffect(()=>{
        if(nome && email && senha && dataNascimento &&sobreNome){
            setButtonEnable(true)
        }else{
            setButtonEnable(false)
        }
    },[nome,email,senha, dataNascimento, sobreNome])

    return (
        <div className="container">
            <h1>Cadastro</h1>
            <SpinnerInfinity enabled={loading}/>
            {!loading && (
                <div className='form'>

                    <InputContainer
                        textLabel='Nome'
                        id='name'
                        text={(text: string) => setNome(text)}
                        type='text'
                    />
                    <InputContainer
                        textLabel='Sobrenome'
                        id='lastName'
                        text={(text: string) => setSobreNome(text)}
                        type='text'
                    />
                    <InputContainer
                        textLabel='Data Nascimento'
                        id='birthday'
                        text={(text: string) => setDataNascimento(text)}
                        type='date'
                    />
                    <InputContainer
                        textLabel='Email'
                        id='email'
                        text={(text: string) => setEmail(text)}
                        type='email'
                    />
                    <InputContainer
                        textLabel='Senha'
                        id='password'
                        text={(text: string) => setSenha(text)}
                        type='password'
                    />
                    <button onClick={() => { buttonEnable ? cadastrarUsuario() : false }} >Enviar</button>

                </div>
            )}
        </div>
    )
}

export default Cadastro;