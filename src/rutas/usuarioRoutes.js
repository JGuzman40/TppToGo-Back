const { Router } = require("express");
const UsuarioController = require("../controladores/usuarioController");

const router = Router();

router.post("/", UsuarioController.crearUsuario); // Crear nuevo usuario
router.get("/", UsuarioController.obtenerUsuarios); // Obtener todos los usuarios
router.get("/:id", UsuarioController.obtenerUsuarioPorId); // Obtener usuario por ID
router.put("/:id", UsuarioController.actualizarUsuario); // Actualizar usuario
router.delete("/:id", UsuarioController.eliminarUsuario); // Eliminar usuario

module.exports = router;