function errorMiddleware(err, req, res, next) {
    console.error(err);
    res.status(500).json({message: "Erreur interne du serveur."});
}

module.exports = errorMiddleware;