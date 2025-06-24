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
const storageDocuments = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/documents/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

export const uploadDocuments = multer({ storage: storageDocuments });