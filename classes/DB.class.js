'use strict';

var connection;

module.exports = class DB {
	constructor(){
		// do not connect to mongodb multiple times!
		if (connection){ return;}

		this.settings = g.settings.DB;

		this.connect();

		this.loadModules();
	}

	connect() {
		// connect
		m.mongoose.connect('mongodb://' + this.settings.host + '/' + this.settings.db);

		// store connection
		connection = m.mongoose.connection;

		// log successful, connection
		connection.once('open', () => {
			console.log("Mongoose connected to " + this.settings.db);
		});
	}

	getModel(name){
		return m.mongoose.model(name);
	}

	loadModules(){
		// find all files in this models
		var modelFiles = m.fs.readdirSync(this.settings.modelDir);

		console.log('files loaded', modelFiles);

		// require all files
		modelFiles.forEach(function(fileName){
			require(m.path.join(this.settings.modelDir, fileName));
		}, this);
	}
};