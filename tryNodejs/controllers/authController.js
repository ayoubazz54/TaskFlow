const {createUser} = require("../services/authService");

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

module.exports = {
    register
};