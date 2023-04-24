import Messages from "../components/Messages";
import React, {useState} from "react";
import InputContainer from "../components/InputContainer";
import {authenticationFirebase} from "../services/firebase";
import {useNavigate} from "react-router-dom";
import {FirebaseResponseMessage} from "../enum";

function Login() {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [loginMessage, setLoginMessage] = useState<string | undefined>();
    const navigate = useNavigate()

    async function validateLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const {user} = await authenticationFirebase(email, senha)
            sessionStorage.setItem('userUid', user.uid);
            navigate('/dashboard');
        } catch (e: any) {
            const errorMessage = e?.message;
            const authError: keyof typeof FirebaseResponseMessage = errorMessage
                .substring(errorMessage.indexOf("auth/") + 5)
                .replace(')', '')
                .replace('.', '')
                .replace('-', '_')
                .toUpperCase();
            setLoginMessage( FirebaseResponseMessage[authError] || 'Error ao processar sua solicitação tente mais tarde')
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <div className="form-container">


                <form className='form' onSubmit={(e) => validateLogin(e)}>
                    {loginMessage && <Messages text={loginMessage}/>}
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
                    <button>Acessar</button>
                </form>
                <button className='register' onClick={()=> navigate('/cadastro')}>Cadastrar novo usuário</button>
            </div>
        </div>
    )
}

export default Login;