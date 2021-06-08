import React, {useState}from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, setTarea] = useState('');                   // estado para agregar tareas
  const [tareas, setTareas] = useState([])                  // estado para agregar tareas a la lista de tareas
  const [modoEdicion, setModoEdicion] = useState(false)     // estado para editar la tarea seleccionada, esta falso porque al principio esta el formulario agregar
  const [id, setId] = useState('')                          // estado para el id cuando vaya a editar la tarea
  const [error, setError] = useState(null)                  // estado para los errores

  const agregarTarea = (e) => {
    e.preventDefault()
    
    if(!tarea.trim()) {
      setError('Escriba tarea...')
      return 
    }

    // Agregar Tareas
    setTareas([
      ...tareas,
      {id: shortid.generate(), nombreTarea: tarea}      // shortid para generar id aleatorios
    ])

    setTarea('')
    setError(null)
  }

  // eliminar tareas
  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter(item => item.id !== id);
    setTareas(arrayFiltrado);
  }

  // Editar tarea
  const editar = (item) => {
    setModoEdicion(true)
    setTarea(item.nombreTarea)        // esto para que la tarea antigua se pinte en el input 
    setId(item.id)
  }

  // Actualizar en el arrary tarea editada
  const editarTarea = (e) => {
    e.preventDefault()
    
    if(!tarea.trim()) {
      setError('Escriba tarea...')
      return 
    }

    const arrayEditado = tareas.map(item => item.id === id ? {id: id, nombreTarea: tarea} : item)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')        
    setId('')
    setError(null)

  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">

            {

              tareas.length === 0 ? (
                <li className="list-group-item">No hay Tareas</li>
              ) : (

              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>

                  <button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>

                  <button 
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
              </li>
              ))
              )
            }

          </ul>
        </div>
        <div className="col-4">
        <h4 className="text-center">

          {
            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
          }

        </h4>
        <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>

          {
            error ? <span className="text-danger">{error}</span> : null
          }

          <input 
            type="text" 
            className="form-control mb-2"
            placeholder="Ingrese Tarea"
            onChange={e => setTarea(e.target.value)}            // Agregar el estado del imput
            value={tarea}
          />

          {/* Cambiar el boton dependido si queremos editar o agregar, con  los (se puede colocar codigo html dento de JS)  */}
          {
            modoEdicion ? (
              <button className="btn btn-warning btn-block" type="submit" >Editar</button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit" >Agregar</button>
            )
          }

        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
