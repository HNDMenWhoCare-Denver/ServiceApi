/**
 * Created by SJClark on 10/11/2016.
 */

var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var express = require('express');
var app = express();
var fs = require("fs");

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/100MenWhoCare;User ID=100MenWhoCareAdmin;Password=Osu1991!;';
//var connectionString = 'Host=localhost;Port=5432;Database=100MenWhoCare;User ID=100MenWhoCareAdmin;Password=Osu1991!;';
var db = pgp(connectionString);

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/LocalData/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
})

app.get('/Users/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/LocalData/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        var user = data["user" + req.params.id]
        console.log( user );
        res.end( JSON.stringify(user));
    });
})

app.get('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end( JSON.stringify(data));
    });
})



