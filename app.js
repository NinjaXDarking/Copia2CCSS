//Importamos 
const Server = require('./models/Server');
//Creamos una nueva variable
const server=new Server();
//Invocamos el metodo listen
server.listen();



  // const express = require('express');
  // const app = express();
  // const unidadesRouter = require('./routes/unidades');

  // // Middleware para parsear JSON
  // app.use(express.json());

  // // Rutas
  // app.use('/unidades', unidadesRouter);

  // // Iniciar el servidor
  // const PORT = process.env.PORT || 3000;
  // app.listen(PORT, () => {
  // console.log(`Servidor corriendo en el puerto ${PORT}`);
  // });
