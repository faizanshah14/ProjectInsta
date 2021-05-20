const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../keys');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'not logged in yet ' });
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, jwt_secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: 'not logged in ' });
        }
        const { _id } = payload;
        User.findById(_id).then((userdata) => {
            console.log(userdata);
            req.user = userdata;
            next();
        });
    });
};