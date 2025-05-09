import express from 'express'
import { connectDB, sequelize } from './dataBase/db.js';
import usersRouter from './routes/usersRouter.js';
import 'dotenv/config';
import authRouter from './routes/authRouter.js';
import parentsRouter from './routes/parentsRouter.js';
import childrensRouter from './routes/childrensRouter.js';
import eventsRouter from './routes/eventsRouter.js';
import activitiesRouter from './routes/activitiesRouter.js';
import registationsRouter from './routes/registrationsRouter.js';
import associations from './models/associations.js';
import cors from 'cors';
import path from 'path';





// Middleware pour gérer les requêtes en JSON
const app = express();
const PORT = process.env.PORT || 8000;
associations();

app.use(express.json());  //  cette ligne pour que req.body fonctionne avec des données JSON
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/images', express.static('public/images')) // afichage dans url tous ce qui se trouve dans le dossier public


app.use('/api', usersRouter, parentsRouter, childrensRouter, eventsRouter, authRouter, activitiesRouter, registationsRouter)

app.get('/public/images/:filename', (req, res) => {
  const file = `public/images/${req.params.filename}`;
  res.sendFile(path.resolve(file));
});

connectDB()



app.listen(PORT, () => {
  console.log(`Bonjour, bienvenue sur mon serveur Express! ${PORT}`);
});