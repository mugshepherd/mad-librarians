var express = require("express");
var app = express();
var hbs = require("hbs");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost/mad-librarians");
var db = mongoose.connection;
// Change to a schema for a mad lib with multiple words
var MadLib = mongoose.model("MadLib", new mongoose.Schema({
    noun1: String,
    noun2: String,
    noun3: String,
    adj1: String,
    adj2: String,
    adj3: String,
    verb1: String,
    verb2: String,
    verb3: String
}));

app.get("/", function( req, res ){
  res.render("index");
});

io.on('connection', function(socket){
  socket.on('mad lib', function(input){
    io.emit('mad lib', input);
    var madLib = MadLib.create({
      noun1: input[0],
      noun2: input[1],
      noun3: input[2],
      adj1: input[3],
      adj2: input[4],
      adj3: input[5],
      verb1: input[6],
      verb2: input[7],
      verb3: input[8]
    });
  });
});

http.listen(3000, function(){
  console.log("Now listening on *:3000");
});
