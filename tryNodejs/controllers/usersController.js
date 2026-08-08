const { getUserById } = require("../services/usersService");

async function getMe(req, res, next) {
    try {
        const user = await getUserById( req.user.id );
        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable."
            });
        }
        res.json(user);
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    getMe
};