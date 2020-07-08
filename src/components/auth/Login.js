import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext;
    const authContext = useContext(AuthContext)
    const {iniciarSesion, mensaje, autenticado} = authContext;

    //En caso de que se haya autenticado o sea un registro duplicado
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    //Definir el State
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    //Extraer usuario
    const {email, password} = usuario

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar campos vacios
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }
        //Pasarlo al action
        iniciarSesion({email, password})
    }
    
    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form
                    onSubmit = {onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta 
                </Link>
            </div>
        </div>
    );
}
export default Login;