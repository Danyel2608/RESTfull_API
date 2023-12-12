//importar express
const express = require("express");
const router = express.Router();
//Importamos modelo con schema correspondiente
const Model = require("../Model/houseModel");

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
//Obtener members by id
router.get("/:id/members", async (req, res) => {
  //más correco usar .exec()
  Model.findById(req.params.id)
    .exec()
    .then(
      (data) => res.status(200).json({ status: "succeeded",data, error: null })
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
//Obtener settlemetns by id
router.get("/:id/settlemetns", async (req, res) => {
  //más correco usar .exec()
  Model.findById(req.params.id)
    .exec()
    .then(
      (data) => res.status(200).json({ status: "succeeded",data, error: null })
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
//Obtener allies by id
router.get("/:id/allies", async (req, res) => {
  //más correco usar .exec()
  Model.findById(req.params.id)
    .exec()
    .then(
      (data) => res.status(200).json({ status: "succeeded",data, error: null })
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
//Obtener enemies by id
router.get("/:id/enemies", async (req, res) => {
  //más correco usar .exec()
  Model.findById(req.params.id)
    .exec()
    .then(
      (data) => res.status(200).json({ status: "succeeded",data, error: null })
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
    words: req.body.words,
    description: req.body.description,
    sigil: req.body.sigil,
    leader: req.body.leader,
    region: req.body.region,
    sttlements: req.body.sttlements,
    religion: req.body.religion,
    allies: req.body.allies,
    enemies: req.body.enemies,
    members: req.body.members,
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
