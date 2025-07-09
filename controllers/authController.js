import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { Router } from 'express';
import { sequelize } from '../dataBase/db.js';


const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;


export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    try {
        //Search the database for an existing user with the provided email.
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already taken' });
        }

        const salt = await bcrypt.genSalt(10);
        //Hachez le mot de passe en texte brut à l'aide du sel généré pour un stockage sécurisé
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
            image: req.file ? '/images/' + req.file.filename : '/images/par_default.jpg'
        });
        // Generates a JWT token (JSON Web Token) signed with a secret key (JWT_SECRET).
        const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET);


        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                role: newUser.role,
            },
            token: token
        });

    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    
    try {
      
        //Searches the database for a user whose email address matches the one provided.
        const user = await User.findOne({ where: { email } });
        //console.log("l'email", user)

        if (!user) {
            return res.status(401).json({ message: 'Email or password invalid' });
        }
        //Compares the provided password with the hashed password stored in the database.
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(401).json({ message: 'Email or password invalid' });
        }
        // Generates a signed JWT token containing the user's ID and role.
        const token = await jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({ message: `Welcome ${user.first_name}`, token });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export default authRouter;