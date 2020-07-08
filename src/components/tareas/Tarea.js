import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

    //Extrae un proyecto si esta Activo
    const proyectosContext = useContext(ProyectoContext)
    const {proyecto} = proyectosContext

    //Obtener el state de Tareas
    const tareasContext = useContext(TareaContext)
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext

    //Extraer el proyecto
    const [proyectoActual] = proyecto;

    //Funcion para el boton Eliminar Tarea
    const btnEliminarTarea = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    //Funcion patra cambiar el Estado de las Tareas
    const btnCambiarEstadoTarea = tarea => {
        if (tarea.estado) {
            tarea.estado = false
        } else {
            tarea.estado = true
        }
        actualizarTarea(tarea)
    }

    //Seleccionar Tarea Actual
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }
        

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ?   (
                            <button 
                                type="button"
                                className="completo"
                                onClick={() => btnCambiarEstadoTarea(tarea)}
                            >Completo</button>
                        )
                    :   (
                            <button 
                                type="button"
                                className="incompleto"
                                onClick={() => btnCambiarEstadoTarea(tarea)}
                            >Incompleto</button>
                        )

                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick = {() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick = {() => btnEliminarTarea(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;