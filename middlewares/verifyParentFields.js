const verifyParentFields = async (req, res, next) => {
   
    try {
      const {user_id, address, phone } = req.body;
  
      // Vérification que tous les champs nécessaires sont présents
      if (!user_id || !address || !phone ) {
        return res.status(400).json({
          message: 'All fields (user_id,address, phone) are required'
        });
      }
  
      // Si la validation passe, appeler next pour passer au middleware suivant
      next(); // validateurs
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
   export default verifyParentFields