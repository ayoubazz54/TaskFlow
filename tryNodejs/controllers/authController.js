const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const {createUser, findUserByEmail} = require("../services/authService");

async function register(req, res, next) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const {email, password} = req.body;

        if (typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({message: "L'email est obligatoire."});
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Email invalide."});
        }
        if (typeof password !== "string" || password.trim() === "") {
            return res.status(400).json({message: "Le mot de passe est obligatoire."});
        }    

        const user = await createUser(email, password);
        res.status(201).json(user);
    }
    catch(error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const {email, password} = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                message: "Email ou mot de passe incorrect."
            })
        }

        const validPassword = bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Mot de pass incorrect."
            });
        }

        const token = jwt.sign(
            {
                id: user.id, 
                email: user.email
            }, 
            process.env.JWT_SECRET, {expiresIn:"1h"}
        );

        res.json({token});
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    register,
    login
};