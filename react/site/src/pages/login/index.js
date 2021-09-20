import { React, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Container, ChatButton, ChatInput } from './styled.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import Cookies from 'js-cookie'

import Api from '../../services/api.js'
const api = new Api();


export default function Login(){

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const loading = useRef(null);
    const navigation = useHistory();

    const logar = async () => {
        loading.current.continuousStart();
        let r = await api.login(login, senha);

        if(r.erro){
            toast.error("Login ou Senha Invalidos !!")
            limpar();
            loading.current.complete();
        } else{
            let r = Cookies.set('usuario-logado', true)
            console.log(r)
            navigation.push('/produtos')
        }    
    }

    function limpar() {
        setLogin('');
        setSenha('');
    }


    return(
        <Container>
            <LoadingBar color="#10EAEA" ref={loading}/>
            <ToastContainer />
            <div className="box">
                <div className="titulo">
                    <img  style={{ width: "3em", height: "3em" }} src="/assets/images/logo.svg" alt="" />
                    <br />
                    DevStore
                </div>
            </div>

            <div className="login">
                <div className="container-form">
                    <div className="form-row">
                        <div className="title">Faça seu Login</div>
                    </div>

                    <div className="form-row">
                        <div>
                            <div className="label">Login </div>
                            <ChatInput
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                style={{ border: '1px solid gray', fontSize: '1.5em', cursor: "text" }}
                                />
                        </div>
                        <div>
                            <div className="label">Senha </div>
                            <ChatInput
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                type="password"
                                style={{ border: '1px solid gray', fontSize: '1.5em', cursor: "text" }}
                                />
                        </div>
                        <div>
                            <ChatButton
                                onClick={logar}
                                style={{ fontSize: '1.2em'}}> Login </ChatButton>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    );
}