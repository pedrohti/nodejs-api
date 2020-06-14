const express = require("express");
const app = express();
const db = require("./database/db");

app.get("/api/save", (request, response) => {
	const body = request.body;
	const query = `INSERT INTO events (name, dateStart, dateEnd, address, logo) VALUES (?, ?, ?, ?, ?);`;
	const values = [
		body.name,
		body.dateStart,
		body.dateEnd,
		body.address,
		body.logo,
	];

	function afterInsert(err) {
		if (err) {
			return res.send("Erro ao cadastrar! ", err);
		}
	}

	db.run(query, values, afterInsert);
});

app.get("/api/list", (request, response) => {
	db.all(`SELECT * FROM events`, (err, rows) => {
		if (err) {
			return res.send("Erro ao listar os eventos", err);
		}

		return response.json(rows);
	});
});

app.get("/api/update/:id", (request, response) => {
	const body = request.body;
	const id = request.params.id;

	const values = [
		body.name,
		body.dateStart,
		body.dateEnd,
		body.address,
		body.logo,
		id,
	];

	const query = `UPDATE events SET (name = ?, dateStart = ?, dateEnd = ?, address = ?, logo = ?) WHERE id = ?`;

	db.run(query, values, (err) => {
		if (err) {
			return console.log(err);
		}
		console.log(`Row(s) updated: ${this.changes}`);
	});

	return response.send();
});

app.get("/api/delete/:id", (request, response) => {
	const id = request.params.id;

	db.run(`DELETE FROM events WHERE id = ?`, id, (err) => {
		if (err) {
			return console.log(err);
		}

		return res.send("Registro deletado com sucesso!");
	});
});

const PORT = 3000;

app.listen(PORT, () => console.log("Server UP on http://localhost:" + PORT));
