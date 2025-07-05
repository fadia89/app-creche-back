const verifyChildrenFields = async (req, res, next) => {
   
    try {
      const {first_name, last_name, birth_date, gender, band, parent_id, registration_date } = req.body;
  
      // Checking that all necessary fields are present
      if (!first_name || !last_name || !birth_date || !gender || !band || !parent_id || !registration_date) {
        return res.status(400).json({
          message: 'All fields (first_name, last_name, birth_date, gender, band, parent_id, registration_date) are required'
        });
      }
  
      // If validation passes, call next to move to the next middleware
      next(); // validators
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
   export default verifyChildrenFields;