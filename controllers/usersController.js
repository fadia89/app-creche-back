
import User from '../models/users.js';




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

export const getUsersProfile = async (req, res) => {
  const {id} = req.user

  try{
    const userByID = await User.findByPk(id, {
      attributes: { exclude: ['password'] } 
    });
    if (!userByID) {
      return res.status(404).json('User not found');
    }
    return res.status(200).json(userByID);

  } catch (err){
    console.log(err);  
        return res.status(500).json({ message: 'Internal server error' }); 
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
 export const updateUser = async (req, res) => {
  const { first_Name, last_Name, email, password, role } = req.body;
  const id = req.user.id; // ✔ Récupération depuis le token via middleware

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await user.update({
      first_name: first_Name || user.first_name,
      last_name: last_Name || user.last_name,
      email: email || user.email,
      password: password || user.password,
      role: role || user.role,
      image: req.file ? '/public/images/' + req.file.filename : user.image
    });

    return res.status(200).json({ message: 'User successfully updated', user: updatedUser });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

    
 

 
  