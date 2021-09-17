import { React, useRef, useState } from 'react'

import { Container, ChatButton, ChatInput } from './styled.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const loading = useRef(null);

    const rota = () => {
        toast.warning("Use '/produtos' para acessar a tela de produtos")
    }

    return(
        <Container>
            <ToastContainer color="#10EAEA" ref={loading} />
            <div className="box">
                <div className="titulo">
                    <img src="/assets/images/logo-monkchat.png" alt="" />
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
                                value={usuario}
                                onChange={e => setUsuario(e.target.value)}
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
                                onClick={rota}
                                style={{ fontSize: '1.2em'}}> Login </ChatButton>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    );
}