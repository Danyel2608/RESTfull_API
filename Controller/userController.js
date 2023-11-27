//importar express
const express = require("express");
const router = express.Router();

//Escuchar peticiones GET
router.get("/", (req, res) => {
  res.send("GET collection");
});

//Obtener documento por id
router.get("/:id", (req, res) => {
  res.send(`GET document id ${req.params.id}`);
});

//Recibimos documentos POST
router.post("/", (req, res) => {
  res.send("POST collection");
});

//Actualiar documentos
router.patch("/:id", (req, res) => {
  res.send(`UPDATE document id ${req.params.id}`);
});
//Borrar documentos
router.delete("/:id", (req, res) => {
  res.send(`Delete document id ${req.params.id}`);
});

module.exports=router; 
