//importar express
const express = require("express");
const router = express.Router();
//Importamos modelo con schema correspondiente
const Model = require("../Model/userModel");

//Escuchar peticiones GET
router.get("/", async (req, res) => {
  //Metodo get buscando mediante Model y a su vez en la coleccion users de mongodb de la base de datos Skynet del .env
  // Model.find()
  //   .then(
  //     (data) => res.status(200).json({ status: "succeeded", data, error: null })
  //     //atrapar el error
  //   )
  //   .catch((error) =>
  //     res.status(404).json({
  //       //mostrarlo
  //       status: "filed",
  //       data: null,
  //       error: error.message,
  //     })
  //   );
  try {
    const data = await Model.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res.status(404).json({
      //mostrarlo
      status: "failed",
      data: null,
      error: error.message,
    });
  }
});

//Obtener documento por id
router.get("/:id", (req, res) => {
  //más correco usar .exec()
  Model.findById(req.params.id)
    .exec()
    .then(
      (data) => res.status(200).json({ status: "succeeded", data, error: null })
      //atrapar el error
    )
    .catch((error) =>
      res.status(404).json({
        //mostrarlo
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});

//Recibimos documentos POST
router.post("/", (req, res) => {
  const data = new Model({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    skills: req.body.skills,
    personality: req.body.personality,
  });

  data
    .save()
    .then((data) =>
      res.status(201).json({ status: "succeeded", data, error: null })
    )
    .catch((error) => {
      res.status(404).json({
        //mostrarlo
        status: "failed",
        data: null,
        error: error.message,
      });
    });
});

//Actualiar documentos
router.patch("/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  const options = {
    new: true,
  };
  Model.findByIdAndUpdate(id, data, options)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) => {
      res.status(404).json({
        //mostrarlo
        status: "failed",
        data: null,
        error: error.message,
      });
    });
});
//Borrar documentos
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Model.findByIdAndDelete(id)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) => {
      res.status(404).json({
        //mostrarlo
        status: "failed",
        data: null,
        error: error.message,
      });
    });
});

module.exports = router;
