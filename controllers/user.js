const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.user = {
	createUser: async (req, res) => {
		const { email, displayName, password,avatar } = req.body;
		if ((email === '') | (displayName === '') | (password === '')) {
			res.send('email or username or password are empty');
		}
		
		const userExist = await User.find({ email: email });
		if (userExist.length === 0) {
			bcrypt.hash(password, saltRounds, async (err, hash) => {
				if (err) return req.send('Error in hash');
				const url = req.protocol + '://' + req.get('host');
				const newUser = new User();
				newUser.avatar = url + /uploads/ + req.file.filename;
				newUser.email = email;
				newUser.displayName = displayName;
				newUser.password = hash;
				await newUser.save();
				res.send(newUser);
			});
		} else {
			res.send('User exist already');
		}
	},
	listUser: async (req, res) => {
		const list = await User.find({});
		res.send(list);
	},
	updateUser: async (req, res) => {
		const { email, displayName, password, status } = req.body;

		if ((email === '') | (displayName === '') | (password === '')) {
			res.send('email or username or password are empty');
		} else {
			bcrypt.hash(password, saltRounds, async (err, hash) => {
				const newUser = await User.findOneAndUpdate(
					{ _id: req.params.id },
					{
						$set: {
							email: email,
							password: hash,
							displayName: displayName,
							status: status
						}
					}
				);
				res.json({ email: newUser.email, displayName: newUser.displayName });
			});
		}
	},
	deleteUser: async (req, res) => {
		const newUser = await User.deleteOne({ _id: req.params.id });
		res.send(newUser);
	},
	loginUser: async (req, res) => {
		const { email, password } = req.body;
		const passwordHash = await User.findOne({ email: email });
		bcrypt.compare(password, passwordHash.password, async function(err, result) {
			if (result) {
				const user = { displayName: passwordHash.displayName, email: passwordHash.email };
				const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
				res.json({
					email: passwordHash.email,
					displayName: passwordHash.displayName,
					accessToken: access_token
				});
			} else {
				res.json({message:"Please check your email or password and try again"})
			}
		});
	},
	findUser: async (req, res) => {
		const findUser = await User.find({ _id: req.params.id },{avatar:1,displayName:1,email:1});
		if (findUser) {
			res.send(findUser)
		} else {
			res.json({ message: 'User does not exits' });
		}
	}
};
