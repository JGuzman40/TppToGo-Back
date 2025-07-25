const {
  crearUsuarioService,
  obtenerUsuariosService,
  obtenerUsuarioPorIdService,
  actualizarUsuarioService,
  eliminarUsuarioService,
} = require("../servicios/UsuarioService");

const catchAsync = require("../utils/catchAsync");

// Crear usuario
const crearUsuario = async (req, res) => {
  const nuevoUsuario = await crearUsuarioService(req.body);
  res.status(201).json({
    mensaje: "Usuario creado exitosamente",
    usuario: nuevoUsuario,
  });
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  const usuarios = await obtenerUsuariosService();
  res.status(200).json(usuarios);
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  const usuario = await obtenerUsuarioPorIdService(req.params.id);
  res.status(200).json(usuario);
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
  const usuarioActualizado = await actualizarUsuarioService(req.params.id, req.body);
  res.status(200).json({
    mensaje: "Usuario actualizado exitosamente",
    usuario: usuarioActualizado,
  });
};

// Eliminar usuario
const eliminarUsuario = async (req, res) => {
  await eliminarUsuarioService(req.params.id);
  res.status(200).json({
    mensaje: "Usuario eliminado exitosamente",
  });
};

module.exports = {
  crearUsuario: catchAsync(crearUsuario),
  obtenerUsuarios: catchAsync(obtenerUsuarios),
  obtenerUsuarioPorId: catchAsync(obtenerUsuarioPorId),
  actualizarUsuario: catchAsync(actualizarUsuario),
  eliminarUsuario: catchAsync(eliminarUsuario),
};
