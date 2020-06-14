const sqlite = require("sqlite3");
const db = new sqlite.Database("./src/database/database.db");

db.serialize(() => {
	db.run(`
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            dateStart TEXT,
            dateEnd TEXT,
            address TEXT,
            logo TEXT
        )
    `);

	const sqlInsert = `INSERT INTO events (name, dateStart, dateEnd, address, logo) VALUES (?, ?, ?, ?, ?);`;

	const values = [
		"O Universo Linux (TESTE)",
		"2020-06-20 08:00:00",
		"2020-06-20 16:00:00",
		"Av. Sete de Setembro, nº 1002",
		"https://cdn.pixabay.com/photo/2013/07/13/11/43/tux-158547_960_720.png",
	];

	function afterInsertData(err) {
		if (err) {
			return console.log(err);
		}

		console.log("Dados cadastrados com sucesso!");
	}

	db.all(`SELECT * FROM events`, (err, rows) => {
		if (err) {
			return console.log(err);
		}

		if (rows.length == 0) {
			db.run(sqlInsert, values, afterInsertData);
		}

		console.log("Aqui estão os dados:");
		// console.log(rows);
	});

	// db.run(`DELETE FROM events WHERE id = ?`, [1], (err) => {
	// 	if (err) {
	// 		return console.log(err);
	// 	}

	// 	console.log("Registro deletado com sucesso!");
	// });
});

module.exports = db;
