
import { Container } from './styled'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from 'react-router-dom'

import Cookies from 'js-cookie'
import { useState } from 'react';


function lerUsuarioLogado(navigation){
    let logado = Cookies.get('usuario-logado');
    if(logado == null){
        navigation.push('/')
        return null;
    }

    let usuarioLogado = JSON.parse(logado);
    return usuarioLogado;
}

export default function Index(props) {
    const navigation = useHistory();
    let usuarioLogado = lerUsuarioLogado(navigation) || {};


    const [img] = useState(usuarioLogado.img_usuario);
    const [nome] = useState(usuarioLogado.nm_usuario);

    console.log(img, nome)

    const logoOff = async () => {
        Cookies.remove('usuario-logado')
        navigation.push('/')
    }

    return (
        <Container>
            <ToastContainer />
            <div class="reader-right-box">
                <div class="box-user"> 
                    <div class="user-image">
                        <img className="image" src={img} alt="" />
                        <div class="absolute">3</div>
                    </div>
                    <div class="user-name"> Olá, <b> {nome} </b> </div>
                </div>
                
                <div class="box-image">
                    <div class="refresh-button"> <button onClick={props.refresh}> <img src="/assets/images/refresh.svg" alt = "" />  </button> </div>
                    <div class="left-button"> <button onClick={logoOff}> <img src="/assets/images/log-out.svg" alt = "" />  </button> </div>
                </div>
            </div>
            <div class="bottom-bar-right-header" />
        </Container>
    )
}
