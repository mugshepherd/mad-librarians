var express = require('express');
var app = express();
var hbs = require('hbs');
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require('mongoose');

app.set("view engine", "hbs");


//meat and potatos - uses the websockets library

app.get("/", function(req, res){
	res.render("index");
});


io.on('connection', function(socket){
	console.log("a user is connected!")
});

http.listen(3000, function(){
	speak("listening on port 3000!");
});