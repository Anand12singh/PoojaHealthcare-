"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("patient_visits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patient_id: { type: Sequelize.INTEGER, allowNull: false },
      timestamp: { type: Sequelize.DATE },
      age: { type: Sequelize.INTEGER },
      height: { type: Sequelize.STRING },
      weight: { type: Sequelize.STRING },
      rbi: { type: Sequelize.STRING },
      bmi: { type: Sequelize.STRING },
      rbs: { type: Sequelize.INTEGER },
      chief_complaints: { type: Sequelize.TEXT },
      history_of_dm_status: { type: Sequelize.INTEGER },
      history_of_dm_description: { type: Sequelize.STRING },
      hypertension_status: { type: Sequelize.INTEGER },
      hypertension_description: { type: Sequelize.STRING },
      IHD_status: { type: Sequelize.INTEGER },
      IHD_description: { type: Sequelize.STRING },
      COPD_status: { type: Sequelize.INTEGER },
      COPD_description: { type: Sequelize.STRING },
      any_other_illness: { type: Sequelize.TEXT },
      past_surgical_history: { type: Sequelize.TEXT },
      drug_allergy: { type: Sequelize.TEXT },
      temp: { type: Sequelize.STRING },
      pulse: { type: Sequelize.INTEGER },
      bp_systolic: { type: Sequelize.INTEGER },
      bp_diastolic: { type: Sequelize.INTEGER },
      pallor: { type: Sequelize.INTEGER },
      icterus: { type: Sequelize.INTEGER },
      pallor: { type: Sequelize.INTEGER },
      icterus: { type: Sequelize.INTEGER },
      oedema_status: { type: Sequelize.INTEGER },
      oedema_description: { type: Sequelize.TEXT },
      lymphadenopathy: { type: Sequelize.STRING },
      HO_present_medication: { type: Sequelize.STRING },
      respiratory_system: { type: Sequelize.TEXT },
      cardio_vascular_system: { type: Sequelize.TEXT },
      central_nervous_system: { type: Sequelize.TEXT },
      pa_abdomen: { type: Sequelize.TEXT },
      pa_abdomen_image: { type: Sequelize.STRING },
      pr_rectum: { type: Sequelize.TEXT },
      pr_rectum_image: { type: Sequelize.STRING },
      local_examination: { type: Sequelize.STRING },
      clinical_diagnosis: { type: Sequelize.STRING },
      comorbidities: { type: Sequelize.STRING },
      plan: { type: Sequelize.STRING },
      advise: { type: Sequelize.STRING },
      status: {
        type: Sequelize.ENUM("0", "1"), // Enum for status
        defaultValue: "1", // Default status to '1'
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      updated_by: {
        type: Sequelize.INTEGER,
      },
      deleted_by: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("patient_visits");
  },
};
