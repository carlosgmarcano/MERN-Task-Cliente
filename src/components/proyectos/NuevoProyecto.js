import React, {Fragment, useState, useContext} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //Obtener el State del Formulario
    const proyectosContext = useContext(ProyectoContext);
    const { formulario,
            errorformulario, 
            mostrarFormulario, 
            agregarProyecto, 
            mostrarError} = proyectosContext; 

    //State para proyecto

    const [proyecto, setproyecto] = useState({
        nombre : '' 
    })

    const {nombre} = proyecto;

    //Lee los contenidos del input 
    const onChangeProyecto = e => {
        setproyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })        
    }

    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();
        
        //Valudar el proyecto
        if (nombre === '') {
            mostrarError()
            return;
        }
        //Agregar el state 
        agregarProyecto(proyecto)
        //Reiniciar el Formulario
    }
    return ( 
        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={() => mostrarFormulario()}
            >
            Nuevo Proyecto </button>
            {
            formulario 
                ?   
                    (
                        <form className ="formulario-nuevo-proyecto">
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                value = {nombre} 
                                onChange = {onChangeProyecto}
                            />
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                                onClick={onSubmitProyecto}
                                />
                        </form>
                    )  
                : null }
            {errorformulario
                ?<p className="mensaje error">El Nombre del proyecto es obligatorio</p> 
                : null }
        </Fragment>
     );
}
 
export default NuevoProyecto;