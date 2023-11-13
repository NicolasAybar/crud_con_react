//import logo from './logo.svg';
import './App.css';
//import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
//import withReactContent from 'sweetalert2-react-content'

//const mensaje = withReactContent(Swal)
function App() {
  //variables de estado
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);//se inicializa con un a lista vacia
  //metodo para agregar datos
  const add = () => {
    Axios.post("http://localhost:3001/create", {  //la barra es slash
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro almacenado con exito</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue registrado con exito</i>",
        icon: 'success',
        timer: 3000
      }).catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error)).message
        })
      }); //cierra el catch
    });
  }
  //fin de metodo para agregar

  //variable para editar que permite todas las acciones para modificar
  const editarEmpleado = (val) => {
    setEditar(true);
    setId(val.id);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
  }
  //fin de varianle editar

  //metodo para listar
  const getEmpleados = () => {

    Axios.get("http://localhost:3001/empleados").then((response) => {  //cuando se obtenga la respuesta que lo ponga en una variable response
      setEmpleados(response.data);
    });
  }
  getEmpleados();
  //fin de listar

  //metodo actualizar
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro actualizado con exito</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue actualizado con exito</i>",
        icon: 'success',
        timer: 3000
      }).catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error)).message,
        })
      });
    })
  //fin de actualizar

  //metodo eliminar
  const deleteEmpleado = (val) => {
      Swal.fire({
        title: 'Confirmar eliminar',
        html: "<i>Realmente desea eliminar a <strong>" + val.nombre + "</strong> ?</i>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, elimibarlo!'
      }).then(result => {
        if (result.isConfirmed) {
          //por si es decir true
          Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              icon: 'success',
              title: val.nombre + ' fue eliminado.',
              showConfirmButton: false,
              timer: 2000
            });//fin de Swal
          }).catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se logro eliminar el empleado',
              footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error)).message,
            })  //fin de Swal

          });//fin de catch
        }//Axios.delete
      });
    }
    //fin de eliminar

    //metodo limpiar
    const limpiarCampos = () => {
      setNombre("");
      setEdad("");
      setPais("");
      setCargo("");
      setAnios("");
      setId("");
      setEditar(false);
    }
    //fin metodo limpiar
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
                  setNombre(event.target.value);//de este campo quiero el valor
                }}
                className="form-control" /*value="{nombre}"*/ placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Edad:</span>
              <input type="text" /*value="{edad}"*/
                onChange={(event) => {
                  setEdad(event.target.value);
                }}
                className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Pais:</span>
              <input type="text" /*value="{pais}"*/
                onChange={(event) => {
                  setPais(event.target.value);
                }}
                className="form-control" placeholder="Ingrese el pais" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Cargo:</span>
              <input type="type" /*value="{cargo}"*/
                onChange={(event) => {
                  setCargo(event.target.value);
                }}
                className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div className='input-group mb-3'>
              <span className="input-group-text" id="basic-addon1">Antiguedad:</span>
              <input type="number"
                onChange={(event) => {
                  setAnios(event.target.value);
                }}
                className="form-control" /*value="{anios}"*/ placeholder="Ingrese los años de antiguedad" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

          </div>//fin clase body
          <div className="card-footer text-muted">
            <p>derechos reservados</p>
            {
              editar ?
                <div>
                  <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                  <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
                : <button className='btn btn-success' onClick={add}>Registrar</button>
            }

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
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              empleadosList.map((val, key) => {  //cada valor o item va a tener un valor o llave que lo representa
                return
                <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                        onClick={() => {
                          editarEmpleado(val);  //val tiene cada uno de los elementos empleados
                        }}
                        className="btn btn-info">Editar</button>
                      <button type="button" onClick={() => {  //funcion anonima
                        deleteEmpleado(val);
                      }} className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>//fin de container
    );
  }
}
  export default App;
