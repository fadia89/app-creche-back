import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.js";
import verifyAdmin from"../middlewares/verifyAdmin.js";
import { addDocument, getAllDocuments, deleteDocument, getDocumentById, updateDocument, getParentDocument } from "../controllers/docmentsControlleur.js";
import {uploadDocuments} from '../middlewares/uploadFile.js'




const documentsRouter = Router ();

//For the administrator all documents
documentsRouter.get('/documents', verifyAdmin,getAllDocuments);

documentsRouter.get('/documents/:id', verifyUser,getDocumentById);

//For users (parents): view documents only
documentsRouter.get ('/my-documents',verifyUser , getParentDocument)

documentsRouter.post('/documents', verifyUser,uploadDocuments.single('file'), addDocument);

documentsRouter.patch('/documents/:id',verifyUser,updateDocument);

documentsRouter.delete('/documents/:id',verifyUser,deleteDocument);




export default documentsRouter;



