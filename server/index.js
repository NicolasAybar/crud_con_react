const express = require("express");
const app = express();
const mysql = require("mysql");

const cors = require("cors");
app.use(cors());
app.use(express.json());//se convierte en formato json
//creo la conexion con la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados_crud"
});

//metodo para guardar
//req es pregunta y el res es la respuesta
app.post("/create", (req, res) => {
    //datos qwue nos envian desde el formulario
    const nombre = req.body.nombre;  //la solicitud tiene un cuerpo con los datos nombres
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    //le hago una consulta a la base de datos
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)', [nombre, edad, pais, cargo, anios],
        (err, result, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

//fin de guardar

//metodo para actualizar
app.put("/update",(req, res) => {
    //datos qwue nos envian desde el formulario
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    //le hago una consulta a la base de datos
    db.query('UPDATE empleados set nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?', [id,nombre, edad, pais, cargo, anios],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

//fin de actualizar

//metodo para eliminar
app.delete("/delete/:id",(req, res) => {
    //datos qwue nos envian desde el formulario
    const id = req.params.id;
   
    //le hago una consulta a la base de datos
    db.query('DELETE FROM empleados WHERE id=?',id,
        (err,result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

//fin de eliminar


//metodo para listar
app.get("/empleados", (req, res) => {
    //le hago una consulta a la base de datos
    db.query('SELECT * FROM empleados',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);//la query de la base de datos
            }
        });
});

//fin del metodo listar

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
})