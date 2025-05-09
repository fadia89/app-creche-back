import User from "../models/users.js";

 const verifyUserFields = async (req, res, next) => {
 
  try {
    const { first_name, last_name, email, password, role } = req.body;
    console.log(req.body)
    

    // Vérification que tous les champs nécessaires sont présents
    if (!first_name || !last_name || !email || !password ) {
      return res.status(400).json({
        message: 'All fields (first_name, last_name, email, password) are required',
      });
    }

    // Vérification si l'email existe déjà dans la base de données
    console.log(`Vérification de l'email : ${email}`);
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log("Email déjà utilisé");
      return res.status(400).json({ message: 'The email is already in use by another user' });
    }

    
    // Si la validation passe, appeler next pour passer au middleware suivant
    console.log('Validation réussie, appel de next()...');
    next(); // valideurs pour adduser
  } catch (err) {
    console.log("Erreur dans le middleware : ", err);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
export default verifyUserFields

