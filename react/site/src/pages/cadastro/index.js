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
    const [nome, setNome] = useState('');
    const [img, setImg] = useState('');


    const loading = useRef(null);
    const navigation = useHistory();

    const criarUsuario = async () => {
        loading.current.continuousStart();

        console.log("imagem tela cadastro: " + img)
        let r = await api.criarConta(login, nome, senha, img);

        console.log(r)

        if(r.erro){
            toast.error(r.erro);
            loading.current.complete(); 
        } else {
            loading.current.complete(); 
            Cookies.set('usuario-logado', JSON.stringify(r), { expires: 7 })
            navigation.push('/produtos')
        }
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
                        <div className="title">Crie sua Conta</div>
                    </div>

                    <div className="form-row">
                        <div>
                            <div className="label"> Nome </div>
                            <ChatInput
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                style={{ border: '1px solid gray', fontSize: '1.5em', cursor: "text" }}
                                />
                        </div>
                        <div>
                            <div className="label"> Login </div>
                            <ChatInput
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                type="text"
                                style={{ border: '1px solid gray', fontSize: '1.5em', cursor: "text" }}
                                />
                        </div>
                        <div>
                            <div className="label"> Senha </div>
                            <ChatInput
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                type="password"
                                style={{ border: '1px solid gray', fontSize: '1.5em', cursor: "text" }}
                                />
                        </div>
                        <div>
                            <div className="label">  Link Imagem </div>
                            <ChatInput
                                value={img}
                                onChange={e => setImg(e.target.value)}
                                type="text"
                                style={{ border: '1px solid gray', fontSize: '1.5em', cursor: "text" }}
                                />
                        </div>
                        <div>
                            <ChatButton
                                onClick={criarUsuario}
                                style={{ fontSize: '1.2em'}}> Criar </ChatButton>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    );
}