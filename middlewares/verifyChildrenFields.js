const verifyChildrenFields = async (req, res, next) => {
   
    try {
      const {first_name, last_name, birth_date, gender, band, parent_id, registration_date } = req.body;
  
      // Vérification que tous les champs nécessaires sont présents
      if (!first_name || !last_name || !birth_date || !gender || !band || !parent_id || !registration_date) {
        return res.status(400).json({
          message: 'All fields (first_name, last_name, birth_date, gender, band, parent_id, registration_date) are required'
        });
      }
  
      // Si la validation passe, appeler next pour passer au middleware suivant
      next(); // validateurs
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
   export default verifyChildrenFields;