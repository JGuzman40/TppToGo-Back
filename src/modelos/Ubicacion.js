// src/modelos/Ubicacion.js
module.exports = (sequelize, DataTypes) => {
  const Ubicacion = sequelize.define("Ubicacion", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    etiqueta: DataTypes.STRING,
    direccion: DataTypes.TEXT,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    referencia: DataTypes.TEXT,
    esFavorita: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    creadoEn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Ubicacion;
};