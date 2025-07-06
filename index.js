import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sert les images uploadées en statique
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

// Sert les documents uploadés dans /tmp
app.use('/documents', express.static('/tmp'));

// Exemple route téléchargement directe (optionnel)
app.get('/download/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  let folder;

  if (type === 'images') {
    folder = path.join(process.cwd(), 'public/images');
  } else if (type === 'documents') {
    folder = '/tmp'; // dossier où sont stockés les documents
  } else {
    return res.status(400).send('Type de fichier non pris en charge');
  }

  const filePath = path.join(folder, filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Erreur lors du téléchargement :', err);
      res.status(404).send('Fichier non trouvé');
    }
  });
});
