import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTareas = () => {

    //Extraer proyectos del state inicial
    const proyectosContext = useContext(ProyectoContext)
    const {proyecto, eliminarProyecto} = proyectosContext

    //Extraer las tareas del state inicial
    const TareasContext = useContext(TareaContext)
    const {tareasproyecto} = TareasContext

    //Si no hay proyecto seleccionado
    if(!proyecto) return <h1>Selecciona un Proyecto</h1>
    
    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto

    //Funcion para eliminar proyecto
    const onclickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No Hay Tareas que Mostrar</p></li>)
                    : <TransitionGroup>
                    {tareasproyecto.map(tarea =>(
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                tarea ={tarea}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onclickEliminar}
            >
                Eliminar Proyecto &times;</button>           
        </Fragment>
    );
}

export default ListadoTareas;