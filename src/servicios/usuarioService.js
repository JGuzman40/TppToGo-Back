const { Usuario } = require("../db");
const bcrypt = require("bcryptjs");

// Crear usuario
const crearUsuarioService = async (data) => {
  const { nombre, email, password, rol, telefono } = data;

  // Validar si ya existe usuario con ese email
  const existente = await Usuario.findOne({ where: { email } });
  if (existente) throw new Error("Ya existe un usuario con este email");

  // Encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear nuevo usuario
  const nuevoUsuario = await Usuario.create({
    nombre,
    email,
    password: hashedPassword,
    rol,
    telefono,
  });

  return nuevoUsuario;
};

// Obtener todos los usuarios (sin password)
const obtenerUsuariosService = async () => {
  return await Usuario.findAll({
    attributes: { exclude: ["password"] },
  });
};

// Obtener usuario por ID
const obtenerUsuarioPorIdService = async (id) => {
  const usuario = await Usuario.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

// Actualizar usuario
const actualizarUsuarioService = async (id, data) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("Usuario no encontrado");

  const { nombre, email, password, rol, telefono } = data;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
  }

  usuario.nombre = nombre ?? usuario.nombre;
  usuario.email = email ?? usuario.email;
  usuario.rol = rol ?? usuario.rol;
  usuario.telefono = telefono ?? usuario.telefono;

  await usuario.save();
  return usuario;
};

// Eliminar (lógico)
const eliminarUsuarioService = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("Usuario no encontrado");

  await usuario.destroy(); // o usa un flag tipo "activo" si prefieres soft-delete
};

module.exports = {
  crearUsuarioService,
  obtenerUsuariosService,
  obtenerUsuarioPorIdService,
  actualizarUsuarioService,
  eliminarUsuarioService,
};
