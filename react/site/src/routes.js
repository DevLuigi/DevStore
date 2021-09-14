
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Alunos from './pages/alunos';
import Error from './pages/error';
import Login from './pages/login'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/alunos" component={Alunos} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    )
}