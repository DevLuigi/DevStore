
import { Container } from './styled'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'

export default function Index() {

    const navigation = useHistory();

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
                        <img src="/assets/images/neo.png" alt="" />
                        <div class="absolute">3</div>
                    </div>
                    <div class="user-name"> Olá, <b>Luigi da Silva Coelho</b> </div>
                </div>
                
                <div class="box-image">
                    <div class="left-button"> <button onClick={logoOff}> <img src="/assets/images/log-out.svg" alt = "" />  </button> </div>
                </div>
            </div>
            <div class="bottom-bar-right-header" />
        </Container>
    )
}
