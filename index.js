import express  from 'express'
import {connectDB , sequelize} from './dataBase/db.js';
import usersRouter from './routes/usersRouter.js';
import 'dotenv/config';
import authRouter from './routes/authRouter.js';
import parentsRouter from './routes/parentsRouter.js';
import childrensRouter from './routes/childrensRouter.js';
import eventsRouter from './routes/eventsRouter.js';
import adminRouter from './routes/adminRouter.js';




// Middleware pour gérer les requêtes en JSON
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());  //  cette ligne pour que req.body fonctionne avec des données JSON
app.use('/api', usersRouter ,parentsRouter, childrensRouter, eventsRouter,authRouter,adminRouter)
//app.use ('/auth',authRouter)




connectDB()

app.listen(PORT, () => {
    console.log(`Bonjour, bienvenue sur mon serveur Express! ${PORT}`);
  });