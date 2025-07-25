// src/modelos/Pago.js
module.exports = (sequelize, DataTypes) => {
  const Pago = sequelize.define("Pago", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    monto: DataTypes.DECIMAL,
    metodo: {
      type: DataTypes.ENUM("efectivo", "yape", "plin"),
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "pagado"),
    },
    comprobante: DataTypes.TEXT,
    creadoEn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Pago;
};