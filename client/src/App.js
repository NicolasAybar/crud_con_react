import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //variables de estado
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);

  const [empleadosList, setEmpleados] = useState([]);
  //metodo para agregar datos
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      alert("Empleado registrado");
    });
  }
  //fin de metodo para agregar

  //metodo para listar
  const getEmpleados = () => {
    try {
      Axios.get("http://localhost:3001/empleados").then((response) => {
        setEmpleados(response.data);
      });
    } catch (error) {
      console.error(error)
    }
  }
  getEmpleados();
  //fin de listar
  return (
    <div className='container'>

      <div className="card text-center">
        <div className="card-header">
          Gestión de empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="text"
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text"
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el pais" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <select
              onChange={(event) => {
                setCargo(event.target.value);
              }}

              className="form-select" >
              <option>Gerente</option>
              <option>Empleado</option>

            </select>
          </div>
          <div className='input-group mb-3'>
            <span className="input-group-text" id="basic-addon1">Antiguedad:</span>
            <input type="number"
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control" placeholder="Ingrese los años" aria-label="Username" aria-describedby="basic-addon1" />
          </div>



        </div>
        <div className="card-footer text-muted">

          <button className='btn btn-success' onClick={add}>Registrar</button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Antiguedad</th>
          </tr>
        </thead>
        <tbody>

          {
            empleadosList.map((val, key) => {
              try{

                return <tr key={val.id}>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
            </tr>
            }catch(err){
                console.log(err);
              }
            })

              
              
          }


        </tbody>
      </table>
    </div>
  );
}

export default App;
