import Document from '../models/documents.js'
import Parent from '../models/parents.js';
import User from '../models/users.js';


export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({
      
      include: {
        model: Parent,
        include: {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
      },
    });

    if (documents.length < 1) {
      return res.status(404).json({ message: 'No document found' });
    }

    return res.status(200).json(documents);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Document.findByPk(id, {
      include: {
        model: Parent,
        include: {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name']
        }
      }
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.status(200).json(document);
  } catch (error) {
    console.error('Error retrieving document:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const getParentDocument = async (req, res) => {
  try {
    const user_id = req.user.id;

    //  Retrieve parent associated with this user
    const parent = await Parent.findOne({ where: { user_id } });

    if (!parent) {
      return res.status(404).json({ message: "Parent not found for this user" });
    }

    //  Utiliser parent.id pour récupérer les documents
    const documents = await Document.findAll({
      where: { parent_id: parent.id }
    });

    return res.status(200).json(documents);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addDocument = async (req, res) => {
  const file = req.file;
  const { type, uploaded_by, parent_id } = req.body;
  console.log('Body:', req.body);
  console.log('File:', req.file);
  if (!file) {
    return res.status(400).json({ message: 'No files sent.' });
  }

  if (!parent_id) {
    return res.status(400).json({ message: 'Parent ID is required' });
  }
  try {

    const existingDoc = await Document.findOne({
      where: { file_name: file.originalname }
    });

    if (existingDoc) {
      return res.status(400).json({ message: 'file with that name already exists.' });
    }


    const newDoc = await Document.create({
      type,
      file_name: file.originalname,
      file_path: file.path,
      uploaded_by,
      parent_id
    });

    return res.status(201).json(newDoc);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteDocument = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only the admin can delete a document..' });
  }

  try {
    const doc = await Document.findByPk(id);

    if (!doc) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    await doc.destroy();

    return res.status(200).json({ message: 'Document deleted successfully.' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const updateDocument = async (req, res) => {
  const { id } = req.params;
   const { type,  file_name, uploaded_by} = req.body;

  try {
    const documentByID = await Document.findByPk(id);

    if (!documentByID) {
      return res.status(404).json({ message: 'Document not found' });
    }
    const updateDocument = await documentByID.update({
      type:type || documentByID.type,
      file_name: file_name || documentByID.file_name,
      uploaded_by: uploaded_by ||documentByID.uploaded_by
    });


    return res.status(200).json(updateDocument);
  } catch (err) {
    console.error('Error updating document:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

