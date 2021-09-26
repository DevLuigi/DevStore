
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import produto from './pages/produtos';
import Error from './pages/error';
import Login from './pages/login';
import cadastro from './pages/cadastro'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/produtos" component={produto} />
                <Route path="/cadastro" component={cadastro} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    )
}