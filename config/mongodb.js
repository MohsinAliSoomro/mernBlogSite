const mongoose = require('mongoose');
function DatabaseConnection() {
	mongoose
		.connect(process.env.mongoDbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
		.then(() => console.log('database Connected'));
}
module.exports = DatabaseConnection;
