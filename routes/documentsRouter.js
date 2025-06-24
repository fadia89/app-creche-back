import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.js";
import { addDocument, getAllDocuments, deleteDocument, getDocumentById, updateDocument } from "../controllers/docmentsControlleur.js";
import {uploadDocuments} from '../middlewares/uploadFile.js'




const documentsRouter = Router ();


documentsRouter.get('/documents', verifyUser,getAllDocuments);

documentsRouter.get('/documents/:id', verifyUser,getDocumentById);

documentsRouter.post('/documents', verifyUser,uploadDocuments.single('file'), addDocument);

documentsRouter.patch('/documents/:id',verifyUser,updateDocument);

documentsRouter.delete('/documents/:id',verifyUser,deleteDocument);




export default documentsRouter;



