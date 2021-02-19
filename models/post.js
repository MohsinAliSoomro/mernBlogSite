const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [ true, "Title Can't be tha blank" ],
			unique: true
		},
		content: {
			type: String,
			required: [ true, "Content Can't be tha blank" ]
		},
		image: {
			type: String,
			required: [ true, "Image Can't be the blank" ]
		},
		author: {
			ref: 'user',
			type: mongoose.Schema.Types.ObjectId,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('post', postSchema);
