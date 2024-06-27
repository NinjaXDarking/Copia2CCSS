const solicitudValeModel = require("../models/vale");


// Obtener todos los registros
const getMethod = async (req, res) => {
  try {
    const vales = await solicitudValeModel.getAllVales();
    if(vales){
      res
        .status(201)
        .json({ message: "Mostrando Solicitudes de Vales desde el método GET",vales});
    }
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro por Id
const getMethodById = async (req, res) => {
  try {
    const id = req.params.id;
    const vale = await solicitudValeModel.getValeById(id);
    if (vale) {
      res
        .status(201)
        .json({ message: "Mostrando Solicitud de Vale desde el método GET",vale});
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo registro
const postMethod = async (req, res) => {
  try {
    const nuevoVale = await solicitudValeModel.createVale(req.body);
    if(nuevoVale){
      res
      .status(201)
      .json({ message: "Vale insertado exitosamente", nuevoVale });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un registro existente
const putMethod = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await solicitudValeModel.updateVale(id, req.body);
    if (updated) {
      const updatedVale = await solicitudValeModel.getValeById(id);
      res
      .status(201)
      .json({ message: "Solicitud Vale actualizada exitosamente", updatedVale });
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un registro
const deleteMethod = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await solicitudValeModel.deleteVale(id);
    if (deleted) {
        res
        .status(201)
        .json({ message: "Vale eliminado exitosamente", id });
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMethod,
  getMethodById,
  postMethod,
  putMethod,
  deleteMethod,
};
