import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const patient_docs = sequelize.define(
  "patient_docs",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    patient_id: {
      type: DataTypes.INTEGER,
    },
    visit_id: {
      type: DataTypes.INTEGER,
    },
    doc_type_id: {
      type: DataTypes.INTEGER,
    },

    doc_type: {
      type: DataTypes.STRING,
    },
    media_path: {
      type: DataTypes.STRING,
    },
    doctor_note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("0", "1"),
      defaultValue: "1",
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  },
  {
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    modelName: "patient_docs",
  }
);

export default patient_docs;
