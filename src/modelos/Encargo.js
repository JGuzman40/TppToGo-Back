// src/modelos/Encargo.js
module.exports = (sequelize, DataTypes) => {
  const Encargo = sequelize.define("Encargo", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    detalleExtra: DataTypes.TEXT,
    estado: {
      type: DataTypes.ENUM("pendiente", "aceptado", "en_camino", "entregado", "cancelado"),
      defaultValue: "pendiente",
    },
    creadoEn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Encargo;
};