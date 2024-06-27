const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MySQLConnection = require('../database/mysql');

class Server{
    constructor(){
     this.app=express();
     this.port=process.env.MYSQLPORT;
     this.revicionValePath='/api/revicionVale';
     this.personaPath='/api/persona';
     this.usuarioPath='/api/usuario';
     this.citaPath='/api/cita';
     this.pacientePath='/api/paciente';
     this.viajePath='/api/viaje';
     this.usersPath='/api/user';
     this.valesPath='/api/vales'
     this.acompanantePath='/api/acompanantes'
     this.funcionarioPath='/api/funcionarios'
     this.especialidadPath='/api/especialidad'
     this.motivoValePath='/api/motivoVale'
     this.servicio='/api/servicios'
     this.destino ='/api/destinos'
     this.unidad= '/api/unidades'
     this.unidadProgramaticaPatch= '/api/unidadProgramatica'
     this.estadoUnidad= '/api/estadounidad'
     this.tipoRecurso= '/api/tiporecurso'
     this.frecuenciaCambio= '/api/frecuenciacambio'
     this.tipoUnidad= '/api/tipounidad'
     this.unidadesViajePath='/api/viajeUnidades'
     this.pacientesViajePath='/api/viajePaciente'
     this.citasViajePath='/api/viajeCita'
     this.choferViajePath='/api/viajeChofer'
     this.middlewares();
     this.routes();
    }

//Metodo que establece las rutas de la API
routes(){
//Creamos la primera peticion
 
this.app.use(this.usuarioPath,require('../routes/usuario'));
this.app.use(this.revicionValePath,require('../routes/revicionValeRoute'));
this.app.use(this.personaPath,require('../routes/persona'));
this.app.use(this.citaPath,require('../routes/cita'));
this.app.use(this.motivoValePath,require('../routes/motivoValeRoute'));
this.app.use(this.pacientePath,require('../routes/paciente'));
this.app.use(this.acompanantePath, require('../routes/acompanante')); 
this.app.use(this.funcionarioPath, require('../routes/funcionariosRoute')); 
this.app.use(this.viajePath,require('../routes/viaje'));
this.app.use(this.unidadProgramaticaPatch,require('../routes/unidadProgramaticaRoute'));
this.app.use(this.usersPath,require('../routes/usuarioRoute'));
this.app.use(this.valesPath,require('../routes/valesRoutes'));
this.app.use(this.acompanantePath,require('../routes/funcionariosRoute'));
this.app.use(this.especialidadPath,require('../routes/EspecialidadMedica'));
this.app.use(this.servicio,require('../routes/ServicioRoute'));
this.app.use(this.destino,require('../routes/destinoRoute'));
this.app.use(this.unidad, require('../routes/unidades'));
this.app.use(this.estadoUnidad,require('../routes/estadounidad'));
this.app.use(this.tipoRecurso,require('../routes/tiporecurso'));
this.app.use(this.frecuenciaCambio,require('../routes/frecuenciacambio'));
this.app.use(this.tipoUnidad,require('../routes/tipounidad'));
this.app.use(this.unidadesViajePath,require('../routes/viajeUnidades'));
this.app.use(this.pacientesViajePath,require('../routes/viajePaciente'));
this.app.use(this.citasViajePath,require('../routes/viajeCita'));
this.app.use(this.choferViajePath,require('../routes/viajeChofer'));
}

//Funciones que tiene el express y que me permite usarlas reutilizando codigo
middlewares(){
    this.app.use(express.static('public'));
    this.app.use(cors());
    //Habilitar el parseo de los datos del body
    this.app.use(express.json());
}

listen(){
    this.app.listen(this.port || 3000, ()=>{ 
         console.log(`El servidor esta corriendo en el puerto: ${this.port}`);
    });
}

mySQLDBConect(){
    MySQLConnection()
}

}
module.exports=Server;

