import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';


const Formulario = ({guardarGasto, guardarCrearGasto}) => {
  ///state formulario
  const [nombre, guardarNombre] = useState('');
  const [cantidad, guardarCantidad] = useState(0);
  const [ error, guardarError] = useState(false);
  
  
  const agregarGasto = e => {
    e.preventDefault();

    // validar
    if(cantidad < 1 || isNaN( cantidad) || nombre.trim() === '') {
        guardarError(true);
        return;
    }
    guardarError(false);

    //construir el gasto
    const gasto = {
      nombre, 
      cantidad,
      id: shortid.generate()
    }
    //console.log(gasto)

    //pasar el gasto al componente principal
   guardarGasto(gasto)
   guardarCrearGasto(true)

    //reset del form
    guardarNombre('');
    guardarCantidad(0);


  }
  return (  
    <form
      onSubmit={agregarGasto}
    >
      <h2>Agrega tus gastos</h2>
      { error ? <Error mensaje="Ambos campos son obligatorios o el presupuesto es incorrecto" /> : null}
    
      <div className="campo">
        <label>Nombre Gasto</label>
        <input 
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={e => guardarNombre(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Cantidad Gasto</label>
        <input 
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value = {cantidad}
          onChange ={ e => guardarCantidad(parseInt(e.target.value, 10))} 
        />
        {/*es la funcion del onchage pero se hizo directamente en el onChange*/}
        <input 
          type="submit"
          className="button-primary u-full-width"
          value="Agregar Gasto"
        />
      </div>
    </form>
  );
}
 
Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired
}
export default Formulario;