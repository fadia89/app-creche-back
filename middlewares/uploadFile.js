import multer from 'multer'
import path from 'path'; 

// Middleware for images
const storageImages = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
   });

 export   const upload = multer({ storage: storageImages });

 // Middleware for documents
/* const storageDocuments = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/documents/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

export const uploadDocuments = multer({ storage: storageDocuments }); */
// MIME types autorisés
const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
];

const storageDocuments = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/documents/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé'), false);
  }
};

export const uploadDocuments = multer({
  storage: storageDocuments,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite de 10 Mo
  }
});