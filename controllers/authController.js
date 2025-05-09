
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { Router } from 'express';


 const authRouter = Router();
 const JWT_SECRET = process.env.JWT_SECRET;

 
 export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    try {
        // Vérification de l'existence de l'email
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already taken' });
        }

        // Hachage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Création du nouvel utilisateur
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
            image: req.file ? '/public/images/' + req.file.filename : '/public/images/par_defaut.jpg'
        });


        // Retour de la réponse avec succès
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                role: newUser.role,
            },
        });

    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


 export const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{

        const user = await User.findOne({ where: { email } });
        

        
        if (!user){
            return res.status(401).json({ message: 'Email or password invalid' }); 
        }
        const comparePassword = await bcrypt.compare (password, user.password);
        console.log(comparePassword)
        if (!comparePassword){
            return res.status(401).json({ message: 'Email or password invalid' }); 
        }
        const token = await jwt.sign({id: user.id, role: user.role}, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: `Welcome ${user.first_name}`, token });
  
  
    }catch (err) {
    console.log(err);  
    return res.status(500).json({ message: 'Internal server error' }); 
  }
};


 export default authRouter;