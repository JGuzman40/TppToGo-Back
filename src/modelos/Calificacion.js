// src/modelos/Calificacion.js
module.exports = (sequelize, DataTypes) => {
  const Calificacion = sequelize.define("Calificacion", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    puntaje: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 },
    },
    comentario: DataTypes.TEXT,
    creadoEn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Calificacion;
};