import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext;
    const authContext = useContext(AuthContext)
    const {registroUsuario, mensaje, autenticado} = authContext;

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
        nombre:'',
        email: '',
        password: '',
        confirmarPass:''
    });

    //Extraer usuario
    const {nombre, email, password, confirmarPass} = usuario

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar campos vacios
        if (nombre.trim()==='' || 
            email.trim()==='' || 
            password.trim()==='' || 
            confirmarPass.trim()==='') {
                mostrarAlerta('Todos los campos son obligatorios','alerta-error');
                return;
            }
        //Password minimo 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('El password debe ser minimo 6 caracteres','alerta-error');
            return;
        }

        //Verificar que ambos Pass sean iguales
        if (password !== confirmarPass) {
            mostrarAlerta('Las contraseñas no coinciden','alerta-error');
            return;
        }
        //Pasarlo al action
        registroUsuario({
            nombre,
            email,
            password
        })
    }
    
    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                <form
                    onSubmit = {onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre de Usuario</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
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
                        <label htmlFor="password">Password</label>
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
                        <label htmlFor="confirmarPass">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmarPass"
                            name="confirmarPass"
                            placeholder="Repetir Password"
                            onChange={onChange}
                            value={confirmarPass}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesion 
                </Link>
            </div>
        </div>
    );
}
export default NuevaCuenta;