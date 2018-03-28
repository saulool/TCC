const express = require('express');
const app = express();

app.use(function(req, res, next) {
  	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Content-Type");
	next();
});

app.use(express.static('.'));
app.use(express.static('./dist'));

app.listen(8080, function () {
  console.log('Client application started on port 8080');
});
