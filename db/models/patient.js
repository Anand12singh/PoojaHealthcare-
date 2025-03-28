// models/patient.js
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import PatientVisit from "./patient_visits.js";
import PatientDocument from "./patient_docs.js";

const Patient = sequelize.define(
  "patient",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    phid: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    gender: { type: DataTypes.INTEGER }, // 0-Male, 1-Female, 2-Others
    mobile_no: { type: DataTypes.STRING },
    alternative_no: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE },
    referral_by: { type: DataTypes.STRING },
    location: { type: DataTypes.INTEGER }, // Location code/map

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
    modelName: "patient",
  }
);
Patient.hasMany(PatientVisit, {
  foreignKey: "patient_id",
  as: "patient_visits",
});
Patient.hasMany(PatientDocument, {
  foreignKey: "patient_id",
  as: "patient_documents",
});

export default Patient;
