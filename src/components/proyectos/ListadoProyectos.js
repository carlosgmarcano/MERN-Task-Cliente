import React, {useContext, useEffect} from 'react';
import Proyecto from './proyecto'
import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {

    //Extraer proyectos de State Inicial
    const proyectosContext = useContext(ProyectoContext);
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext; 

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {
        //si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
            console.log(mensaje)
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);
    
    if(proyectos.lenght === 0) return <p>No Hay Proyectos, comienza creando uno</p>
    
    return (
        <div>
            <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                <TransitionGroup>
                    {proyectos.map(proyecto => (
                        <CSSTransition
                            key={proyecto._id}
                            timeout={200}
                            classNames="proyecto"
                        >
                            <Proyecto
                            proyecto = {proyecto}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ul>            
        </div>
    );
}
export default ListadoProyectos;