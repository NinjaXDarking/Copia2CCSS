const viaje = require('../models/viaje');
const { createViaje, getAllviajes, eliminateViaje, updatingViaje, getAllviajesById, putViajeCitas } = require('../models/viaje');

const postViaje = async (req, res) => {
    const viajeData = req.body;
    try {
      
      if (viajeData.Citas.length < 1){
        res.status(404).json({ message: "No seleccionaste ninguna cita" });
      }
        // if (!viajeData.FechaInicio) {
        //   viajeData.FechaInicio = new Date();
        // }
      const newViaje = await createViaje(viajeData);
      for (let i = 0; i < viajeData.Citas.length; i++) {
          await putViajeCitas(viajeData.idUnidad,viajeData.idUsuario,viajeData.Citas[i].Idcita);
      }

      if (newViaje.success) {
          res.status(200).json({ message: newViaje.message, viaje: newViaje });
      } else {
          res.status(404).json({ message: newViaje.message });
      } 

      } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar el viaje' });
    }
};

const getAllviajess = async (req, res) => {
  try {
    const viajeAll = await getAllviajes();

  if (viajeAll.success) {
      res.status(200).json({ message: viajeAll.message, viaje: viajeAll.viaje });
  } else {
      res.status(404).json({ message: viajeAll.message });
  }    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
  }
};

const getAllviajessById = async (req, res) => {
  const idViaje = req.params.idViaje;
  console.log(`id controllers get: ${idViaje}`);
  try {
    const viajeById = await getAllviajesById(idViaje);

  if (viajeById.success) {
      res.status(200).json({ message: viajeById.message, viaje: viajeById });
  } else {
      res.status(404).json({ message: viajeById.message });
  }  

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
  }
};

const deleteViaje = async (req, res) => {
  const idViaje = req.params.idViaje;
  console.log(`id controllers delete: ${idViaje}`);
  try {
    const delViaje = await eliminateViaje(idViaje);

  if (delViaje.success) {
      res.status(200).json({ message: delViaje.message, viaje: delViaje });
  } else {
      res.status(404).json({ message: delViaje.message });
  }

  } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al eliminar el viaje' });
  }
};

const updateViaje = async (req, res) => {
  const idViaje = req.params.idViaje;
  const { idUnidad, idChofer, FechaInicio, LugarSalida, idUbicacionDestino, EstadoViaje, Condicion, EstadoCita, FechaCita, HoraCita, Traslado, Camilla, horaInicioViaje, fechaInicioViaje, horaFinViaje, kilometrajeFinal, horasExtras, viaticos } = req.body; 

  console.log(`id controllers updating: ${idViaje}`);
  try {
    const updViaje = await updatingViaje(idViaje, { idUnidad, idChofer, FechaInicio, LugarSalida, idUbicacionDestino, EstadoViaje, Condicion, EstadoCita, FechaCita, HoraCita, Traslado, Camilla, horaInicioViaje, fechaInicioViaje, horaFinViaje, kilometrajeFinal, horasExtras, viaticos });

  if (updViaje.success) {
      res.status(200).json({ message: updViaje.message, viaje: updViaje });
  } else {
      res.status(404).json({ message: updViaje.message });
  }  

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el viaje' });
  }

}

module.exports = { postViaje, getAllviajess, deleteViaje, updateViaje, getAllviajessById };