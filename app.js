//Cargamos el modulo http en el servidor
const http = require("http");
//Selecionamos el puerto 8000 para evitar conflictos con el Front,puerto 3000
const PORT = 8002;
//Creamos un servidor http con una función callback que gestione los codigos de respuesta
const server = http
  .createServer(
    //res = request(peticion),res=response(respuesta)
    //Para cada petcion en la pagina hay (un objeto): una peticion y una respuesta
    //Request contiene los detalles de la peticion
    //Response enviará la respuesta al cliente
    (req, res) => {
      res.statusCode = 200;
      //Cabeceras
      res.setHeader("Content-Type", "text/hmtl");
      res.end("<h1>Hello Word!</h1>");
    }
  )
  .listen(PORT, () => {
    console.log(`server runnig at http://localhost:${PORT}`);
  });
