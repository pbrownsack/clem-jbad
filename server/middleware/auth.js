const isAuthed = (req, res, next) => {
    if (req.user && req.user.id) return next();
    res.send({ error: "You must be authenticated to access that endpoint!", redirect: "/login" });
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.id && req.user.admin === 1) return next();
    res.send({ error: "You must be an administrator to access that endpoint!", redirect: "/" });
}

module.exports = { isAuthed, isAdmin };