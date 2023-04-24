import React, {useEffect, useState} from "react";
import {getInfoUser} from "../services/firebase";
import {useNavigate} from "react-router-dom";
import {InfosProperties} from "../types";
import {SpinnerInfinity} from 'spinners-react';

function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [infos, setInfos] = useState<InfosProperties>()
    const userId = sessionStorage.getItem('userUid');
    const navigate = useNavigate()
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = new Intl.DateTimeFormat('pt-BR');

    async function infoUser() {
        if (userId) {
            const data = await getInfoUser(userId)
            if (data) {
                let {dataNascimento, nome, sobreNome, uid, email} = data;
                dataNascimento = formattedDate.format(new Date(dataNascimento))
                setInfos({dataNascimento, nome, sobreNome, uid, email})
                setLoading(false)
            }
        } else {
            navigate('/login')
        }
    }


    useEffect(() => {
        setLoading(true)
        infoUser()
    }, [])

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className='dataList'>
                <SpinnerInfinity enabled={loading}/>
                {!loading && (
                    <>
                        <div>
                            <span className='info-label'>UID:</span>
                            <span className='info-data'>{infos?.uid}</span>
                        </div>
                        <div className='name'>
                            <div>
                                <span className='info-label'>Nome:</span>
                                <span className='info-data'>{infos?.nome}</span>
                            </div>

                            <div>
                                <span className='info-label'>Sobrenome:</span>
                                <span className='info-data'>{infos?.sobreNome}</span>
                            </div>
                        </div>
                        <div>
                            <span className='info-label'>Email:</span>
                            <span className='info-data'>{infos?.email}</span>
                        </div>
                        <div>
                            <span className='info-label'>Data Nascimento:</span>
                            <span className='info-data'>{infos?.dataNascimento}</span>
                        </div>
                    </>
                )}
            </div>
            <button className='new' onClick={()=> navigate('/cadastro')}>Novo usuário</button>
        </div>
    )
}

export default Dashboard