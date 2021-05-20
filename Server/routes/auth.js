const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../keys');
const requireLogin = require('../middleware/requireLogin');

router.post('/signup', (req, res) => {
	const { name, email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: 'Please add all fields ' });
	}
	User.findOne({ email: email })
		.then((savedUser) => {
			if (savedUser) {
				return res.status(422).json({ error: 'user already exist ' });
			}
			bcrypt.hash(password, 10).then((hashedpassword) => {
				const user = new User({
					name,
					email,
					password: hashedpassword,
				});
				user.save().then((user) => {
					res.json({ message: 'saved successfully ' }).catch((err) => {
						console.log(err);
					});
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post('/signin', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: 'Please Add email or pass' });
	}
	User.findOne({ email: email }).then((saveduser) => {
		if (!saveduser) {
			return res.status(422).json({ error: 'invalid email or pass ' });
		}
		bcrypt
			.compare(password, saveduser.password)
			.then((domatch) => {
				if (domatch) {
					//res.json({ message: 'signed successfully' });
					const token = jwt.sign({ _id: saveduser._id }, jwt_secret);
					const { _id, name, email } = saveduser;
					res.json({ token, _id, name, email });
				}
				return res.status(422).json({ error: 'invalid email or pass ' });
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

module.exports = router;
