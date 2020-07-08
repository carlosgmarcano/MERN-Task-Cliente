import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaSate from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada'

//Revisar si tenemos un token
const token = localStorage.getItem('token')
if (token) {
  tokenAuth(token)
}

function App() {
  return (    
    <ProyectoState>
      <TareaState>
        <AlertaSate>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path = "/" component={Login} />
                <Route exact path = "/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path = "/Proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaSate>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
