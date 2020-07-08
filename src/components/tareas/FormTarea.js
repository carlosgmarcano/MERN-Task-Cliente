import React, {useContext, useState, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    //Extrae un proyecto si esta Activo
    const proyectosContext = useContext(ProyectoContext)
    const {proyecto} = proyectosContext

    //Obtener el state de Tareas
    const tareasContext = useContext(TareaContext)
    const { tareaseleccionada, 
            agregarTarea, 
            validarTarea, 
            errortarea, 
            obtenerTareas, 
            actualizarTarea,
            limpiarTarea} = tareasContext
    

    //State del formulario
    const [tarea, settarea] = useState({
        nombre: ''
    })

    useEffect(() => {
        if (tareaseleccionada) {
            settarea(tareaseleccionada)
        } else {
            settarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    //extraer nombre de la tarea
    const {nombre} = tarea;

    //Si no hay proyecto seleccionado
    if(!proyecto) return null

    //Array destructurin para extraer proyecto actual
    const [proyectoActual] = proyecto

    //Leer los valores del formulario
    const handleChange = e => {
        settarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }
    
    const onSubmitTarea = e => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }
        
        //Validar si es edicion o si es nueva tarea
        if(tareaseleccionada === null) {
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea); //Actualiza la tarea seleccionada
            limpiarTarea(); //Elimina la tarea seleccionada del state
        }
        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id)

        //limpiar el formulario
        settarea({
            nombre: ''
        }); 
    }
    return ( 
        <div className="formulario">
            <form
                onSubmit = {onSubmitTarea}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange = {handleChange}
                    />   
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Actualizar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error"> El nombre de la Tarea es Obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;