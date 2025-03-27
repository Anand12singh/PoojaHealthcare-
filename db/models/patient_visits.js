// models/patient_visits.js
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const PatientVisit = sequelize.define(
  "patient_visits",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER },
    timestamp: { type: DataTypes.DATE },
    age: { type: DataTypes.INTEGER },
    height: { type: DataTypes.STRING },
    weight: { type: DataTypes.STRING },
    bmi: { type: DataTypes.STRING },
    rbs: { type: DataTypes.INTEGER },
    chief_complaints: { type: DataTypes.TEXT },
    dm: { type: DataTypes.INTEGER },
    dm_since: { type: DataTypes.STRING },
    hypertension: { type: DataTypes.INTEGER },
    htn_since: { type: DataTypes.STRING },
    any_other_illness: { type: DataTypes.TEXT },
    past_surgical_history: { type: DataTypes.TEXT },
    drug_allergy: { type: DataTypes.TEXT },
    temp: { type: DataTypes.STRING },
    pulse: { type: DataTypes.INTEGER },
    bp_systolic: { type: DataTypes.INTEGER },
    bp_diastolic: { type: DataTypes.INTEGER },
    pallor: { type: DataTypes.INTEGER },
    icterus: { type: DataTypes.INTEGER },
    oedema: { type: DataTypes.INTEGER },
    oedema_text: { type: DataTypes.TEXT },
    lymphadenopathy: { type: DataTypes.STRING },
    present_medication: { type: DataTypes.STRING },
    rs: { type: DataTypes.TEXT },
    cvs: { type: DataTypes.TEXT },
    cns: { type: DataTypes.TEXT },
    pa: { type: DataTypes.TEXT },
    pa_image: { type: DataTypes.STRING },
    pr: { type: DataTypes.TEXT },
    pr_image1: { type: DataTypes.STRING },
    pr_image2: { type: DataTypes.STRING },
    local_examination: { type: DataTypes.TEXT },
    clinical_diagnosis: { type: DataTypes.TEXT },
    comorbidities: { type: DataTypes.TEXT },
    plan: { type: DataTypes.TEXT },
    advise: { type: DataTypes.TEXT },
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
    modelName: "patient_visits",
  }
);

export default PatientVisit;
