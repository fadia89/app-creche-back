
import Parent from '../models/parents.js';
import User from '../models/users.js';



export const getAllParents = async (req, res) => {
    try{
        const parents = await Parent.findAll();
        if (parents.length<1){
            return res.status(404).json({message: 'No parent found'});
        }
        return res.status(200).json(parents);
    }
    catch (err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }

};
export const getParentProfile = async (req, res) => {
    const { id } = req.user; 
    console.log("User ID from token:", id);

    try {
        // Utilisation de findOne avec les critères 'where' et l'option 'attributes' pour exclure le champ 'password'
        const userWithParent = await User.findOne({
            where: { id },
            include: [
              {
                model: Parent,
                as: 'parentDetails' 
                //attributes: ['address', 'phone'], 
              }
            ],
            attributes: { exclude: ['password', 'role'] }
                
        });

        console.log(userWithParent);

        // Vérifier si l'utilisateur existe
        if (!userWithParent) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Retourner les données du parent
        return res.status(200).json(userWithParent);

    } catch (err) {
        console.log(err);  
        return res.status(500).json({ message: 'Internal server error' });
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

export const addParent = async (req, res) => {
    const { user_id, address, phone } = req.body;
  
    try {
      // Vérifier si l'utilisateur existe dans la table `Users`
      const userExists = await User.findByPk(user_id);
      if (!userExists) {
        return res.status(404).json({ message: 'User with this ID already exists' });
      }
  
      // Créer un nouveau parent associé à l'utilisateur
      const newParent = await Parent.create({ user_id, address, phone });
  
      return res.status(201).json(newParent);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
export const updateParentByID = async (req, res) => {
    const {id} = req.params;
    const {address, phone} = req.body;

    try{
        const parentByID = await Parent.findByPk(id);
        if(!parentByID){
            return res.status(404).json({messages: 'Parent not found'});  
        }
        const updateParent = await parentByID.update({
           address: address || parentByID.address,
           phone: phone || parentByID.phone 
        })
        return res.status(200).json({message: 'Parent successfully updated', parent: updateParent});
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
  
    }
};
export const deleteParentByID = async (req,res) => {
    const {id} = req.params;
    try{
        const parentByID = await Parent.findByPk(id);
        if (!parentByID){
            return res.status(404).json({messages: 'Parent not found'});
        }
        await parentByID.destroy({where: {id}});
        return res.status(200).json({messages :'Parent successfully deleted'})

        }
    catch( err){
        console.log (err)
        return res.status(500).json({message: 'Internal server error'});   
    }
};