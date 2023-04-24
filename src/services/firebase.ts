import { initializeApp } from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzUpxsJgfC5nLxj2CrTsvsUlMSmEaMGoE",
    authDomain: "desenvolvimento-web-puc.firebaseapp.com",
    projectId: "desenvolvimento-web-puc",
    storageBucket: "desenvolvimento-web-puc.appspot.com",
    messagingSenderId: "701703006334",
    appId: "1:701703006334:web:a93825e716f995454fd02f"
};

const appFirebase = initializeApp(firebaseConfig);
const authFirebase = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);

const createUserFirebase = (email: string, senha: string) => createUserWithEmailAndPassword(authFirebase, email,senha)
const userRef = (uid: string) => doc(firestore, 'usuarios', uid);

const createUserFireStore = async(uid: string, data: any)=> await setDoc(userRef(uid), data)

const authenticationFirebase = (email: string, senha: string) => signInWithEmailAndPassword(authFirebase, email, senha)

const usuariosRef = collection(firestore, "usuarios");
const usuarioQuery = (userId: string) => query(usuariosRef, where("uid", "==", userId));
const usuarioSnapshot = async (userId: string)=> await getDocs(usuarioQuery(userId));

const getInfoUser = async (userId: string) => {
    const {docs, empty} = await usuarioSnapshot(userId)
    if(empty){
        return false
    }
    const data = docs[0].data()

    return data
}
export {
    authenticationFirebase,
    createUserFireStore,
    createUserFirebase,
    getInfoUser
}