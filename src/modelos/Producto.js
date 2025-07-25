// src/modelos/Producto.js
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define("Producto", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.DECIMAL,
    imagenUrl: DataTypes.TEXT,
    creadoEn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Producto;
};