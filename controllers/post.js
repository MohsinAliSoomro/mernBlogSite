const Post = require('../models/post');
const User =require('../models/user')
exports.post = {
	createPost: async (req, res) => {
		try {
			const findPost = await Post.find({ title: req.body.title });
			if (findPost.title === req.body.title) return res.send({ message: 'Blog already exists' });

			const url = req.protocol + '://' + req.get('host');
			let newPost = new Post();
			newPost.title = req.body.title;
			newPost.content = req.body.content;
			newPost.author = req.body.author;
			newPost.image = url + /uploads/ + req.file.filename;
			await newPost.save();

			res.send(newPost);
		} catch (error) {
			console.log(error);
			res.json({ message: 'error in create blog', error });
		}
	},
	listPost: async (req, res) => {
		const post = await Post.find({}).sort({_id:-1});
		if (post) {
			res.send(post);
		} else {
			res.json({ message: 'here is not any post yet...' });
		}
	},
	Post: async (req, res) => {
		const post = await Post.find({ _id: req.params.id });
		if (post) {
			res.send(post);
		} else {
			res.json({ message: 'Not found' });
		}
	},
	updatePost: async (req, res) => {
		const url = req.protocol + '://' + req.get('host');
		const post = await Post.find({ _id: req.params.id });
		if (post) {
			const newPost = await Post.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						title: req.body.title,
						content: req.body.content,
						image: url + /uploads/ + req.file.filename,
						author: req.body.id
					}
				}
			);
			res.send(newPost);
		} else {
			res.json({ message: 'Not found' });
		}
	},
	deletePost: async (req, res) => {
		const deletePost = await Post.findByIdAndDelete({ _id: req.params.id });
		if (deletePost) {
			res.json({ message: 'Delete successfully...' });
		} else {
			res.json({ message: 'Failed Try again...' });
		}
	}
};
