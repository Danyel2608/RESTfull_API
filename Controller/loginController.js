const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//importar libreria
const bcrypt = require("bcrypt");

//Importamos modelo con schema correspondiente
const Model = require("../Model/loginModel");
const { generateToken, verifyToken } = require("./lib/util");

router.post("/signup", async (req, res) => {
  //Para tener control sobre la funcion asincrona ponemos un try catch
  try {
    const data = new Model({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });
    data
      .save()
      .then((data) =>
        res.status(201).json({ status: "succeeded", data, error: null })
      )
      .catch((error) => {
        // console.log(Object.keys(error));
        // console.log(error.code);
        if (error.code === 11000) {
          // console.log("Clave duplicada");
          return res.status(409).json({
            status: "failed",
            data: null,
            error:
              "You are trying to registrer an existent email.Please choose a new email and try again",
          });
        }
        return res
          .status(400)
          .json({ status: "failed", data: null, error: error.message });
      });
  } catch (error) {
    //Tener el control de los errores que suceden y mostrar el por que de error
    if (error.message === "data and salt arguments required") {
      res.status(422).json({
        status: "failed",
        data: null,
        error:
          "Password is required,please insert a valid password and try again",
      });
    }
  }
});
router.post("/login", async (req, res) => {
  try {
    //Buscar el email en la base de datos
    const data = await Model.findOne({
      email: req.body.email,
    }).exec();
    //Comprobar si la contraseña del cliente es igual a la de la base de datos
    if (data) {
      const validPasssword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      //Si está,GENERAR token para usuario
      if (validPasssword) {
        const user = {
          id: data._id,
          email: data.email,
          role: data.role,
        };
        const token = generateToken(user, false);
        const refreshToken = generateToken(user, true);
        //Respuesta al servidor
        res.status(200).json({
          status: "succeeded",
          data: {
            id: data._id,
            email: data.email,
            role: data.role,
            token,
            refreshToken,
          },
          error: null,
        });
      } else {
        res.status(401).json({
          status: "failed",
          data: null,
          error: "Wrong email or password",
        });
      }
    } else {
      res.status(401).json({
        status: "failed",
        data: null,
        error: "Wrong email or password",
      });
    }
  } catch (error) {
    //Captar el error
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
});
router.get("/refresh", verifyToken, (req, res) => {
  if (!req.user) {
    return res.status(400).send("Access denied");
  }
  const { email, role, exp } = req.user;
  res.status(200).json({
    status: "Succeeded",
    data: {
      token: generateToken(
        {
          email,
          role,
        },
        false
      ),
      refreshToken: generateToken({ email, role }, true),
    },
    error: null,
  });
});
module.exports = router;
