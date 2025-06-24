import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase/db.js";

const Page = sequelize.define('page', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'Pages',
});

export default Page;
