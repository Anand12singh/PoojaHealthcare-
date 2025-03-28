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
    history_of_dm_status: { type: DataTypes.INTEGER },
    history_of_dm_description: { type: DataTypes.STRING },
    hypertension_status: { type: DataTypes.INTEGER },
    hypertension_description: { type: DataTypes.STRING },
    IHD_status: { type: DataTypes.INTEGER },
    IHD_description: { type: DataTypes.STRING },
    COPD_status: { type: DataTypes.INTEGER },
    COPD_description: { type: DataTypes.STRING },
    any_other_illness: { type: DataTypes.TEXT },
    past_surgical_history: { type: DataTypes.TEXT },
    drug_allergy: { type: DataTypes.TEXT },
    temp: { type: DataTypes.STRING },
    pulse: { type: DataTypes.INTEGER },
    bp_systolic: { type: DataTypes.INTEGER },
    bp_diastolic: { type: DataTypes.INTEGER },
    pallor: { type: DataTypes.INTEGER },
    icterus: { type: DataTypes.INTEGER },
    oedema_status: { type: DataTypes.INTEGER },
    oedema_description: { type: DataTypes.TEXT },
    lymphadenopathy: { type: DataTypes.STRING },
    HO_present_medication: { type: DataTypes.STRING },
    respiratory_system: { type: DataTypes.TEXT },
    cardio_vascular_system: { type: DataTypes.TEXT },
    central_nervous_system: { type: DataTypes.TEXT },
    pa_abdomen: { type: DataTypes.TEXT },
    pa_abdomen_image: { type: DataTypes.STRING },
    pr_rectum: { type: DataTypes.TEXT },
    pr_rectum_image: { type: DataTypes.STRING },
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
