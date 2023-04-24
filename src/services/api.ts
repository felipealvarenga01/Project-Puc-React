import axios from 'axios';
import {createUserFirebase, createUserFireStore} from "./firebase";

const api = axios.create({
    baseURL: 'hhtp://localhost'
})


const login = async () => {
    const {data} = await api.post('/')

    return data
}

const createUser = async (data: any) => {
    const {nome, sobreNome, dataNascimento, email, senha} = data;
    try {
        const {user} = await createUserFirebase(email, senha);

        return await createUserFireStore(user.uid, {nome, sobreNome,email, dataNascimento, uid: user.uid})
    }catch(e){
        console.log(e)
    }

    return false
}

const getUser = async () => {
    const {data} = await api.get('/');

    return data;
}

export {
    getUser,
    createUser,
    login
}