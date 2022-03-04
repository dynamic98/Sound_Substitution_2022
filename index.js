
var express = require('express');

var app = express();
var server = app.listen(3000);
app.use(express.static('Visualization_mapping'));


console.log("My socket sever is running")