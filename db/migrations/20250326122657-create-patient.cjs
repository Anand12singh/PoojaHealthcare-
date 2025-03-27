"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("patients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phid: { type: Sequelize.STRING },
      first_name: { type: Sequelize.STRING },
      last_name: { type: Sequelize.STRING },
      gender: { type: Sequelize.INTEGER },
      mobile_no: { type: Sequelize.STRING },
      alternative_no: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      address: { type: Sequelize.TEXT },
      date: { type: Sequelize.DATE },
      referral_by: { type: Sequelize.STRING },
      location: { type: Sequelize.INTEGER },
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
    await queryInterface.dropTable("patients");
  },
};
