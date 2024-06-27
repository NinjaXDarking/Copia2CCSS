const { getAllUsuarios, getUsuario, deleteUsuario, createUsuario, updateUsuario, loginUsuario } = require('../models/usuario');

const getAllUsuariosCont = async (req, res) => {
  try {
    const usuarios = await getAllUsuarios();
    res.json({ message: 'Usuarios obtenidos exitosamente', usuarios });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener los usuarios' });
  }
};

const getUsuarioCont = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await getUsuario(id);
    res.json({ message: 'Usuario obtenido exitosamente', usuario });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteUsuarioCont = async (req, res) => {
  const id = req.params.id;
  console.log(`ID del usuario para eliminar: ${id}`);
  try {
    const delUsuario = await deleteUsuario(id);
    res.status(201).json({ message: 'Usuario eliminado exitosamente', usuario: delUsuario });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const postUsuarioCont = async (req, res) => {
  const usuarioData = req.body;
  try {
    const nuevoUsuario = await createUsuario(usuarioData);
    res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const updateUsuarioCont = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const updUsuario = await updateUsuario(id, newData);
    res.status(201).json({ message: 'Usuario actualizado exitosamente', usuario: updUsuario });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const postLoginCont = async (req, res) => {
  const usuarioData = req.body;
  try {
    const usuario = await loginUsuario(usuarioData);
    res.status(201).json({ message: 'Inicio sessión exitosamente',  usuario });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllUsuariosCont, getUsuarioCont, deleteUsuarioCont, postUsuarioCont, updateUsuarioCont, postLoginCont };
