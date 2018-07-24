const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
	user: settings.user,
	password: settings.password,
	database: settings.database,
	host: settings.hostname,
	port: settings.port,
	ssl: settings.ssl
});
client.connect(err => {
	if (err) {
		return console.error("Connection Error", err);
	}

	function print(err, result) {
		if (err) {
			return console.error("error running query", err);
		}
		console.log(`Found ${result.rows.length} results!`);
		for (let i = 0; i < result.rows.length; i++) {
			console.log(
				`- ${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${new Date(result.rows[i].birthdate).toISOString().substring(0, 10)}'`
			); //output: names
		}
		client.end();
	}
	console.log(`Searching for names in the Database...`);
	client.query(
		`
  SELECT id, first_name, last_name, birthdate 
  FROM famous_people 
  WHERE first_name=$1::text 
  OR last_name=$1::text`,
		[process.argv[2]],
		print
	);
});
