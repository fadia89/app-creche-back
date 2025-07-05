import express from 'express'
import { connectDB, sequelize } from './dataBase/db.js';
import usersRouter from './routes/usersRouter.js';
import 'dotenv/config';
import authRouter from './routes/authRouter.js';
import parentsRouter from './routes/parentsRouter.js';
import childrensRouter from './routes/childrensRouter.js';
import eventsRouter from './routes/eventsRouter.js';
import adminRouter from './routes/adminRouter.js';
import contactsRouter from './routes/contactsRouter.js';
import documentsRouter from './routes/documentsRouter.js';
import { User, Parent, Children, Event, Document } from './models/associations.js'
import cors from 'cors';
import registrationsRouter from './routes/registrationsRouter.js';
import activitiesRouter from './routes/activitiesRouter.js';
import path from 'path';
import pagesRouter from './routes/pagesRouter.js';






const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to handle JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors())



app.use('/images', express.static('public/images'));

app.use('/public', express.static('public'));

app.use('/uploads', express.static('public/images'));

app.use('/api', usersRouter, parentsRouter, childrensRouter, eventsRouter, authRouter, adminRouter, activitiesRouter, registrationsRouter, contactsRouter, documentsRouter, adminRouter)

app.use('/api/pages', pagesRouter)


app.get('/download/:type/:filename', (req, res) => {
  const { type, filename } = req.params;

  let folder = '';
  if (type === 'images') {
    folder = 'public/images';
  } else if (type === 'documents') {
    folder = 'public/documents';
  } else {
    return res.status(400).send('Type de fichier non pris en charge');
  }

  const filePath = path.resolve(folder, filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Erreur lors du téléchargement :', err);
      res.status(404).send('Fichier non trouvé');
    }
  });
});


connectDB()


app.listen(PORT, () => {
  console.log(`Bonjour, bienvenue sur mon serveur Express! ${PORT}`);
});