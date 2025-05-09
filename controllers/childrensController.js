import Children from "../models/childrens.js";
import Parent from "../models/parents.js";



export const getAllChildrens = async (req, res) => {
    try{
       const childrens = await Children.findAll({
        include :{
            model: Parent,
            as: 'parent', 
        }
            
       });
       if (childrens.length <1) {
        return res.status(404).json({message: 'No children found'});
       }
       return res.status(200).json(childrens);
    }
    catch (err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});  
    }

};

export const getChildrenByID = async (req,res) => {
    const {id}= req.params;

    try{
        const childrenByID = await Children.findByPk(id);
        if (!childrenByID){
            return res.status(404).json({message: 'Children not found'});
        }
        return res.status(200).json(childrenByID);

    }
    catch (err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});  
    }
};
export const addChildren = async (req, res) => {
    const { first_name, last_name, birth_date, gender, band, parent_id, registration_date } = req.body;
    
    try {
        // Vérifier si l'enfant existe déjà dans la base de données
        const existingChild = await Children.findOne({
            where: {
                first_name,
                last_name,
                birth_date, 
                parent_id, 
            }
        });

        if (existingChild) {
            // Si l'enfant existe déjà, renvoyer une erreur 409 (conflict)
            return res.status(409).json({ message: 'This child is already registered in the system' });
        }

        // Créer un nouvel enfant dans la base de données
        const newChild = await Children.create({
            first_name,
            last_name,
            birth_date,
            gender,
            band,
            parent_id,
            registration_date
        });

        // Retourner une réponse avec les détails du nouvel enfant créé
        return res.status(201).json({
            message: 'Child created successfully',
            child: newChild
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteChildren = async (req,res) =>{
   const {id} = req.params;
   try{
        const childrenByID = await Children.findByPk(id);
        if (!childrenByID){
        return res.status(404).json({messages: 'Children not found'});
        }
    await childrenByID.destroy({where: {id}});
    return res.status(200).json({messages :'Children successfully deleted'})

    }catch( err){
    console.log (err)
    return res.status(500).json({message: 'Internal server error'});   
}

};
export const updateChildren= async (req,res) =>{
    const {id} = req.params;
    const {first_name, last_name, birth_date, gender, band, parent_id, registration_date } = req.body;

    try{
        const childrenByID = await Children.findByPk(id);
        if(!childrenByID){
            return res.status(404).json({messages: 'Children not found'});  
        }
        const updateChild = await childrenByID.update({
            first_name: first_name || childrenByID.first_name,
            last_name: last_name || childrenByID.last_name,
            birth_date: birth_date || childrenByID.birth_date,
            gender: gender || childrenByID.gender,
            band: band || childrenByID.band,
            registration_date: registration_date || childrenByID.registration_date
        })
        return res.status(200).json({message: 'Children successfully updated', children: updateChild});
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
  
    }

};

