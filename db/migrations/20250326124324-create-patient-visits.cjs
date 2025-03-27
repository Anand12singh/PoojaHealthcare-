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
      any_other_lines: { type: Sequelize.TEXT },
      hypertension: { type: Sequelize.INTEGER },
      htn_since: { type: Sequelize.STRING },
      any_other_illness: { type: Sequelize.TEXT },

      dm: { type: Sequelize.INTEGER },
      dm_since: { type: Sequelize.STRING },
      past_surgical_history: { type: Sequelize.TEXT },
      drug_allergy: { type: Sequelize.TEXT },
      temp: { type: Sequelize.STRING },
      pulse: { type: Sequelize.INTEGER },
      bp_systolic: { type: Sequelize.INTEGER },
      bp_diastolic: { type: Sequelize.INTEGER },
      pallor: { type: Sequelize.INTEGER },
      icterus: { type: Sequelize.INTEGER },

      bp: { type: Sequelize.INTEGER },
      pallor: { type: Sequelize.INTEGER },
      icterus: { type: Sequelize.INTEGER },
      oedema: { type: Sequelize.INTEGER },
      oedema_text: { type: Sequelize.TEXT },
      lymphadenopathy: { type: Sequelize.STRING },
      present_medication: { type: Sequelize.STRING },
      rs: { type: Sequelize.TEXT },
      cvs: { type: Sequelize.TEXT },
      cns: { type: Sequelize.TEXT },
      pa: { type: Sequelize.TEXT },
      pa_image: { type: Sequelize.STRING },
      pr: { type: Sequelize.TEXT },
      pr_image1: { type: Sequelize.STRING },
      pr_image2: { type: Sequelize.STRING },
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
