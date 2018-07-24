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

const print = function(err, result) {
	if (err) {
		return console.error("error running query", err);
	}
	console.log(`Found ${result.length} results!`);
	for (let i = 0; i < result.length; i++) {
		console.log(`- ${i + 1}: ${result[i].first_name} ${result[i].last_name}, born '${new Date(result[i].birthdate).toISOString().substring(0, 10)}'`); //output: names
	}
};
console.log(`Searching for names in the Database...`);
// KNEX begins here //
knex
	.select()
	.from("famous_people")
	.asCallback(print);
