/*eslint no-undef: "error"*/
//Nathaniel Richards
//CPSC 349 Assignment 5 Due 10/16
//Chattrbox
var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var mime = require("mime");

var handleError = function (err,res) {
  res.writeHead("404");
  fs.readFile("app/error.html",function(err,data){ // read from error html
    res.end(data); //read all contents from the file
  });
};

var server = http.createServer(function (req, res) {
  console.log("Responding to a request.");


  var filePath = extract(req.url);

  fs.readFile(filePath,function(err,data){
    if (err) {
      handleError(err,res);

      return;
    }
    else {
      res.setHeader("Content-Type",mime.getType(req.url));
      console.log("MimeType" + mime.getType(req.url));
      res.end(data);
    }
  });

});
server.listen(3000);
