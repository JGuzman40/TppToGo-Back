require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    dialect: "postgres",
    logging: false,
  }
);

// Cargar modelos dinámicamente
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "modelos"))
  .filter((file) => file !== basename && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, "modelos", file));
    modelDefiners.push(model);
  });

modelDefiners.forEach((model) => model(sequelize, Sequelize.DataTypes));

// Relaciones
const { Usuario, Ubicacion, Producto, Encargo, Calificacion, Pago } = sequelize.models;

Usuario.hasMany(Ubicacion, { foreignKey: "usuarioId" });
Ubicacion.belongsTo(Usuario, { foreignKey: "usuarioId" });

Usuario.hasMany(Producto, { foreignKey: "vendedorId" });
Producto.belongsTo(Usuario, { foreignKey: "vendedorId" });

Usuario.hasMany(Encargo, { foreignKey: "clienteId", as: "encargosCliente" });
Encargo.belongsTo(Usuario, { foreignKey: "clienteId", as: "cliente" });

Usuario.hasMany(Encargo, { foreignKey: "motorizadoId", as: "encargosMotorizado" });
Encargo.belongsTo(Usuario, { foreignKey: "motorizadoId", as: "motorizado" });

Producto.hasOne(Encargo, { foreignKey: "productoId" });
Encargo.belongsTo(Producto, { foreignKey: "productoId" });

Ubicacion.hasMany(Encargo, { foreignKey: "origenId", as: "encargosOrigen" });
Ubicacion.hasMany(Encargo, { foreignKey: "destinoId", as: "encargosDestino" });
Encargo.belongsTo(Ubicacion, { foreignKey: "origenId", as: "origen" });
Encargo.belongsTo(Ubicacion, { foreignKey: "destinoId", as: "destino" });

Usuario.hasMany(Calificacion, { foreignKey: "emisorId", as: "calificacionesEmitidas" });
Calificacion.belongsTo(Usuario, { foreignKey: "emisorId", as: "emisor" });

Usuario.hasMany(Calificacion, { foreignKey: "receptorId", as: "calificacionesRecibidas" });
Calificacion.belongsTo(Usuario, { foreignKey: "receptorId", as: "receptor" });

Encargo.hasOne(Calificacion, { foreignKey: "encargoId" });
Calificacion.belongsTo(Encargo, { foreignKey: "encargoId" });

Usuario.hasMany(Pago, { foreignKey: "usuarioId" });
Pago.belongsTo(Usuario, { foreignKey: "usuarioId" });

Encargo.hasOne(Pago, { foreignKey: "encargoId" });
Pago.belongsTo(Encargo, { foreignKey: "encargoId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};