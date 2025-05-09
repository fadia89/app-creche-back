import Registration from '../models/registrations.js'
import Children from '../models/childrens.js';

export const getAllRegistations = async (req, res) => {
    try {
        const registrations = await Registration.findAll();

        if (registrations.length < 1) {
            return res.status(404).json({ message: 'No registation found' });
        }
        
        return res.status(200).json(registrations);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getRegistationByID = async (req, res) => {
    const { id } = req.params;
  
    try {
      const registration = await Registration.findByPk(id);
  
      if (!registration) {
        return res.status(404).json({ message: 'No child is registered with this ID' });
      }
  
      return res.status(200).json(registration);
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

 
  
  export const addRegistration = async (req, res) => {
    const { id: user_id } = req.user; // Récupère l'id de l'utilisateur admin
    const { registration_date, status, parent_id, children_id } = req.body;

    // Vérification si l'utilisateur est authentifié
    if (!user_id) {
        return res.status(400).json({ message: 'User not authenticated' });
    }

    try {
      
        // Vérification si une inscription existe déjà pour cet enfant (par children_id)
        const existingRegistration = await Registration.findOne({
            where: { children_id }
        });

        if (existingRegistration) {
            // Si une inscription existe déjà pour cet enfant
            return res.status(400).json({ message: 'This child is already registered' });
        }

        // Créer l'inscription pour l'enfant
        const registration = await Registration.create({
            registration_date,
            status,
            parent_id,
            children_id,
            user_id // id de l'utilisateur/admin qui effectue l'inscription
        });

        return res.status(201).json({
            message: 'Registration created successfully',
            registration
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


  



export const updateRegistration = async (req, res) => {
    const { id } = req.params; 
    const { registration_date, status, parent_id, children_id } = req.body; 

    try {
        // Vérifier si l'inscription existe
        const registration = await Registration.findByPk(id);

        if (!registration) {
            // Si l'inscription n'existe pas, renvoyer une erreur 404
            return res.status(404).json({ message: 'Registration not found' });
        }

        // Mettre à jour l'inscription
        const updatedRegistration = await registration.update({
            registration_date, 
            status,            
            parent_id,         
            children_id       
        });

        // Retourner une réponse avec l'inscription mise à jour
        return res.status(200).json({
            message: 'Registration updated successfully',
            updatedRegistration
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteRegistration = async (req, res) => {
    const { id } = req.params;  

    try {
        
        const registation = await Registration.findByPk(id);

        if (!registation) {
            return res.status(404).json({ message: 'Registation not found' });
        }

        await registation.destroy({where: {id}});

        return res.status(200).json({ message: 'Registration deleted successfully' });  

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}; 