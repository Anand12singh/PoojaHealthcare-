import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Location = sequelize.define(
  "location",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    location: { type: DataTypes.STRING, },
    status: { type: DataTypes.ENUM("0", "1"), defaultValue: "1" }, // 1 = Active, 0 = Inactive
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
    modelName: "location",
  }
);

export default Location;
