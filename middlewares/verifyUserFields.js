import User from "../models/users.js";

const verifyUserFields = async (req, res, next) => {

  try {
    const { first_name, last_name, email, password, role } = req.body;
    console.log(req.body)


    // Checking that all necessary fields are present
    if (!first_name || !last_name || !email || !password || !role) {
      return res.status(400).json({
        message: 'All fields (first_name, last_name, email, password, role) are required',
      });
    }


    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'The email is already in use by another user' });
    }

    next(); 
  } catch (err) {
    console.error( err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export default verifyUserFields

