module.exports = function(req, res, next) {

    if (req.session && req.session.uid) {

        next();

    } else {

        res.status(401).end();

    }
}