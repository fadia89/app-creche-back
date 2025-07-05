const verifyParentFields = async (req, res, next) => {
   
    try {
      const {user_id, address, phone } = req.body;
  
      if (!user_id || !address || !phone ) {
        return res.status(400).json({
          message: 'All fields (user_id,address, phone) are required'
        });
      }
  
     
      next(); 
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
   export default verifyParentFields