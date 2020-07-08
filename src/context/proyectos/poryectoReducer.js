import {    FORMULARIO_PROYECTO, 
            OBTENER_PROYECTO, 
            AGREGAR_PROYECTO,
            VALIDAR_FORMULARIO,
            PROYECTO_ACTUAL,
            PROYECTO_ERROR,
            ELIMINAR_PROYECTO } from '../../types/'

export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO: //ACCION_REDUCER
            return {
                ...state,           //State Reducer
                formulario: true
            }
        case OBTENER_PROYECTO:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO: 
            return {
                ...state,
                proyectos: [action.payload, ...state.proyectos],
                formulario: false,
                errorformulario: false 
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true

            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}