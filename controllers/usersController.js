import { request } from 'express';
import User from '../models/users.js';
//import authRouter from '../routes/authRouter.js';


export const getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll(); // Récupérer tous les utilisateurs
        if (users.length <1){
            return res.status(404).json({message: 'No user found'});
        }
        return res.status(200).json(users);
    } catch (err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'})
    }
};

export const getUserByID = async (req, res) => {
   console.log(req.params)
   const {id} = req.params
    
   try{
     const userByID = await User.findByPk(id);
     if (!userByID){
       return res.status(404).json({message: 'user not found'})
     }
      return res.status(200).json(userByID);

   }
   catch (err) {
       console.log(err);
       return res.status(500).json({message: 'Internal server error'})

   }
};
export const getUsersByRole = async (req, res) => {
  const { role } = req.params; // Récupérer le rôle depuis l'URL (ex: "admin" ou "parent")

  // Vérification que le rôle est valide
  if (role !== 'admin' && role !== 'parent') 
    {
    return res.status(400).json({ message: 'The role must be "admin" or "parent"' });
    }

  try {
    // Récupérer tous les utilisateurs ayant le rôle spécifié
    const users = await User.findAll({ where: { role } });

    // Si aucun utilisateur n'est trouvé
    if (users.length < 1) {
      return res.status(404).json({ message: 'No users found with this role' });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addUser = async (req, res) => {
    //console.log (req.body)
    const { first_Name,last_Name, email, password, role} = req.body
    
    try{
        const newUser= await User.create(req.body)
        return res.status(200).json(newUser)

    }
    catch (err){
        console.log(err)
        return res.status(500).json({message: 'Internal server error'});
    }
    
};
 export const deleteUserByID = async (req, res) => {
    const {id} = req.params ;
    try{
        const userByID = await User.findByPk(id);
        if (!userByID){
            return res.status(404).json({messages: 'User not found'});
        }
        await userByID.destroy({where : {id}});
        return res.status(200).json({messages :'User successfully deleted'})

    }
    catch (err) {
        console.log (err)
        return res.status(500).json({message: 'Internal server error'});
    }

 };
 export const updateUserByID = async (req,res) => {
    const {id} = req.params;
    const {first_Name, last_Name, email, password, role} = req.body;
    try{
        const userByID = await User.findByPk(id);
        if (!userByID){
            return res.status(404).json({messages: 'User not found'});
        }
          // Mettre à jour uniquement les champs envoyés dans la requête
        const updatedUser = await userByID.update({
            first_Name: first_Name || userByID.first_name,
            last_Name: last_Name || userByID.last_name,
            email: email || userByID.email,
            password: password || userByID.password,
            role: role || userByID.role,
        });
        return res.status(200).json({message: 'User successfully updated', user: updatedUser});

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
 };
    
 

 
  