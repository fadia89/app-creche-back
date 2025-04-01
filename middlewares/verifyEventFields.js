const verifyEventFields = async (req, res, next) => {
   
    try {
      const {name, event_date , location, description, duration, user_id } = req.body;
  
      // Vérification que tous les champs nécessaires sont présents
      if (!name || !event_date || !location || !description|| !duration || !user_id ) {
        return res.status(400).json({
          message: 'All fields (name, event_date , location, description, duration, user_id) are required'
        });
      }
  
      // Si la validation passe, appeler next pour passer au middleware suivant
      next(); // validateurs
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
   export default verifyEventFields;