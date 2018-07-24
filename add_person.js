const settings = require("./settings"); // settings.json
const knex = require("knex")({
	client: "pg",
	connection: {
		host: settings.hostname,
		user: settings.user,
		password: settings.password,
		database: settings.database
	}
});
knex.