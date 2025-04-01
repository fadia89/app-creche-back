import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Créer une instance de Sequelize
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  port: process.env.DB_PORT,
});

// Fonction de connexion à la base de données
const connectDB = async () => {
  try {
    await sequelize.authenticate();  // Essayer de s'authentifier avec la DB
    console.log("✅ Successfully connected to sequelizeDB");
  } catch (error) {
    console.error("❌ sequelizeDB connection error:", error);
    process.exit(1); // Quitter si la connexion échoue
  }
};

// Exporter sequelize et connectDB pour utilisation ailleurs
export  {sequelize, connectDB} ;


