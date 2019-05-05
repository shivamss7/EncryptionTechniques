var mongoose = require('mongoose');

var keySchema = new mongoose.Schema({
	public: {type: Object},
	private: {type: Object}
})

var dataSchema = new mongoose.Schema({
	hybrid: [String],
	layered: [String],
	asymmetric: [Object],
	keys: {type: keySchema, default: keySchema}
});

var storageSchema = new mongoose.Schema({
    author: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    data: {type: dataSchema, default: dataSchema}
});

mongoose.model('Storage', storageSchema);