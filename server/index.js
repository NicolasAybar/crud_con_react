const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());//se convierte en formato json
//creo la conexion con la base de datos
const db = mysql.createConnection({
    
        host:"localhost",
        user: "root",
        password: "",
        database:"empleados_crud"
});

//metodo para guardar
app.post("/create",(req,res)=>{
//datos qwue nos envian desde el formulario
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = rep.body.anios;

    //le hago una consulta a la base de datos
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado registrado con exito!!");
        }
    });
});

//fin de guardar

//metodo para listar
app.get("/empleados",(req,res)=>{   
        //le hago una consulta a la base de datos
        db.query('SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        });
    });
    
    //fin del metodo listar

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})