const { Router } = require("express");
const usuarioRoutes = require("./usuarioRoutes");

const router = Router();

router.use("/usuarios", usuarioRoutes);

module.exports = router;
