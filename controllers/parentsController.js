
import Children from '../models/childrens.js';
import Parent from '../models/parents.js';
import User from '../models/users.js';


export const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email'],
        },
        {
          model: Children,
          attributes: ['first_name', 'last_name']
        }
      ],
    });

    return res.status(200).json(parents);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getParentProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Parent,
          as: 'parentDetails',
          attributes: ['address', 'phone'],
        }
      ],
      attributes: { exclude: ['password', 'role'] }
    });
    console.log("parentDetails:", user.parentDetails);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const response = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      image: user.image,
      address: user.parentDetails?.address || '',
      phone: user.parentDetails?.phone || ''
    };
    console.log(response)

    return res.status(200).json(response);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getManyParent = async (req, res) => {
  try {
    const { ids } = req.body;

    const parent = await Parent.findAll({
      where: { id: ids }
    });
    res.status(200).json(parent);
  } catch (error) {
    console.error("Error in getManyParent :", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



/*
export const getParentsByID = async (req,res) => {
    const {id}= req.params;
    //console.log(id);
    try{
        const parentByID = await Parent.findByPk(id);
        if (!parentByID){
            return res.status(404).json({message: 'Parent not found'});
        }
        return res.status(200).json(parentByID);

    }
    catch(err){ 
    console.log(err);
    return res.status(500).json({message: 'Internal server error'});

    }
    
};*/

export const updateProfile = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(400).json({ message: "ID manquant" });
  }

  const { address, phone, first_name, last_name, email, password } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null;

  try {
    const parent = await Parent.findOne({
      where: { user_id: id },
      include: [{ model: User, as: 'user' }]
    });

    if (!parent) return res.status(404).json({ message: 'Parent not found' });

    const user = parent.user;
    if (!user) return res.status(404).json({ message: 'Utilisateur associé non trouvé' });

    // Vérification que au moins un champ est différent
    const isModified =
      (address && address !== parent.address) ||
      (phone && phone !== parent.phone) ||
      (first_name && first_name !== user.first_name) ||
      (last_name && last_name !== user.last_name) ||
      (email && email !== user.email) ||
      (password && password !== user.password) ||
      (image && image !== user.image);

    if (!isModified) {
      return res.status(400).json({ message: "Aucune modification détectée" });
    }

    // Mise à jour seulement des champs modifiés 
    await parent.update({
      ...(address ? { address } : {}), //... décompose un objet dans un autre ,Pour ne mettre à jour que les champs qui ont une valeur et éviter d’écraser par null ou undefined
      ...(phone ? { phone } : {}),
    });

    await user.update({
      ...(first_name ? { first_name } : {}),
      ...(last_name ? { last_name } : {}),
      ...(email ? { email } : {}),
      ...(password ? { password } : {}),
      ...(image ? { image } : {}),
    });

    return res.status(200).json({ message: 'Profil mis à jour avec succès', parent });

  } catch (err) {
    console.error('Erreur de mise à jour :', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateParent = async (req, res) => {
  const { id } = req.params;
  const { address, phone, user_id } = req.body;

  try {
    const parent = await Parent.findByPk(id);
    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    const updatedParent = await parent.update({
      address: address || parent.address,
      phone: phone  || parent.phone,
      
    });

    return res.status(200).json(updatedParent);
  } catch (err) {
    console.error('Error updating parent:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export const deleteParentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const parentByID = await Parent.findByPk(id);
    if (!parentByID) {
      return res.status(404).json({ messages: 'Parent not found' });
    }
    await parentByID.destroy({ where: { id } });
    return res.status(200).json({ messages: 'Parent successfully deleted' })

  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createParent = async (req, res) => {
  const { address, phone, user_id } = req.body;
  try {
    const newParent = await Parent.create({
      address,
      phone,
      user_id,
    });
    return res.status(201).json(newParent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};