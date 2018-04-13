const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
global.__base = __dirname + '/';

const { DATABASE_URL } = process.env;

global.__db = pgp({
	host: "localhost",
	user: "postgres",
	port: 5432,
	password: "",
	database: "family_budget"
});

//global.__db = pgp(DATABASE_URL);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Content-Type");
    next();
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(request, response) {
  response.send('ok')
});

require(global.__base + 'modules/Usuario/routes')(app);
require(global.__base + 'modules/Lancamento/routes')(app);
require(global.__base + 'modules/Investimento/routes')(app);

app.listen(process.env.PORT || 3000, function () {
    console.log(`Application started on port ${process.env.PORT || 3000}`);
});