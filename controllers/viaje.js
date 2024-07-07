const viaje = require('../models/viaje');
const { DeleteViajeCitaM, UpdateViajeCitaM, createViaje, getAllviajes, updatingViaje, getAllviajesById, putViajeCitas, getAllRelacionViajesCitasM } = require('../models/viaje');

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


const getAllRelacionViajesCitas = async (req, res) => {
  try {
    const ViajesCitas = await getAllRelacionViajesCitasM();

  if (ViajesCitas.success) {
      res.status(200).json({ message: ViajesCitas.message, ViajesCitas: ViajesCitas });
  } else {
      res.status(404).json({ message: ViajesCitas.message });
  }    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
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

const getIdViajesByIdUnidad = async (req, res) => {
  const idUnidad = req.params.idUnidad;
  try {
    const IdViajeData = await viaje.getIdViajesByIdUnidadM(idUnidad);

  if (IdViajeData.success) {
      res.status(200).json({ message: IdViajeData.message, IdViajeData: IdViajeData });
  } else {
      res.status(404).json({ message: IdViajeData.message });
  }  

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los idUnidad' });
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

// const deleteViaje = async (req, res) => {
//   const idViaje = req.params.idViaje;
//   console.log(`id controllers delete: ${idViaje}`);
//   try {
//     const delViaje = await eliminateViaje(idViaje);

//   if (delViaje.success) {
//       res.status(200).json({ message: delViaje.message, viaje: delViaje });
//   } else {
//       res.status(404).json({ message: delViaje.message });
//   }

//   } catch (error) {
//       console.error(error);
//       res.status(400).json({ error: 'Error al eliminar el viaje' });
//   }
// };

const DeleteViajeCita = async (req, res) => {
  const idCita = req.params.idCita;
  try {
    const DelViajeCita = await DeleteViajeCitaM(idCita);

  if (DelViajeCita.success) {
      res.status(200).json({ message: DelViajeCita.message, DelViajeCita: DelViajeCita });
  } else {
      res.status(404).json({ message: DelViajeCita.message });
  }

  } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al eliminar el ViajeCita' });
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
      res.status(404).json({ message: updViaje.message, success: false });
  }  

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el viaje' });
  }

}

const UpdateViajeCita = async (req, res) => {
  const viajeCitaData = req.body;
  try {
    
    if (viajeCitaData.idCita < 1){
      res.status(404).json({ message: "No seleccionaste ninguna cita" });
    }
      // if (!viajeData.FechaInicio) {
      //   viajeData.FechaInicio = new Date();
      // }
    let newViajeCita
    for (let i = 0; i < viajeData.Citas.length; i++) {
        newViajeCita = await UpdateViajeCitaM(viajeCitaData.idViaje[i],viajeCitaData.idCita[i]);
    }
    

    if (newViajeCita.success) {
        res.status(200).json({ message: newViajeCita.message, newViajeCita: newViajeCita });
    } else {
        res.status(404).json({ message: newViajeCita.message });
    } 

    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al registrar el viaje' });
  }
};

module.exports = { 
  DeleteViajeCita, 
  UpdateViajeCita, 
  postViaje, 
  getAllviajess, 
  updateViaje, 
  getAllviajessById,
  getIdViajesByIdUnidad,
  getAllRelacionViajesCitas };