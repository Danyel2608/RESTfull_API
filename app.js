// importar los módulo express y mongoose
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
//obtener la informacion del archivo .env
const users = require("./Controller/userController");
const logins = require("./Controller/loginController");
require("dotenv").config();
//alamcenar la cadena de conexion
const mongoString = process.env.DATABASE_URL;

//conectar con la base de datos
mongoose.connect(mongoString, {
  useNewUrlParser: true,
});
//guardar conexion en una constante
const db = mongoose.connection;

//verificar si la conexion ha sido exitosa
db.on("error", (error) => {
  console.log(error);
});

//se ejecuta una unica vez,por eso once en lugar de on,se conecta a base de datos,en lugar de cada peticion
db.once("connected", () => {
  console.log("succesfully connected");
});

//ecibiendo una notificacion cuando la conexion se haya cerrado
db.on("disconeected", () => {
  console.log("mongoose default connection is disconnected");
});

// seleccionar el puerto 8000, para evitar conflictos con el front (3000)
const PORT = 8000;
// La función express() exportada por el módulo express crea una aplicación Express.
const app = express();
// Analiza las solicitudes que contienen archivos json
app.use(express.json());

app.use("/users", users);
app.use("/auth", logins);

app.listen(PORT, () => {
  // función callback que se ejecutará cuando el servidor esté listo
  console.log(`Server running at http://localhost:${PORT}`);
});
