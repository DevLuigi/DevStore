
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Alunos from './pages/alunos';
import Error from './pages/error';
import Login from './pages/login';
import cadastro from './pages/cadastro'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/produtos" component={Alunos} />
                <Route path="/cadastro" component={cadastro} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    )
}