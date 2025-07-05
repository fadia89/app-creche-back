import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Successfully connected to sequelizeDB");
  } catch (error) {
    console.error("❌ sequelizeDB connection error:", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
