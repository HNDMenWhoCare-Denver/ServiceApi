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

var cn = {
    host: 'ec2-174-129-3-207.compute-1.amazonaws.com', // server name or IP address;
    port: 5432,
    database: 'd4rf4m0c7tqcab',
    user: 'hgxpqhmpqxlabi',
    password: '4RiMskQo0jSLRm91Y-ITj3by1H'
};


var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/100MenWhoCare;User ID=100MenWhoCareAdmin;Password=Osu1991!;';
var connectionString = 'postgres://hgxpqhmpqxlabi:4RiMskQo0jSLRm91Y-ITj3by1H@ec2-174-129-3-207.compute-1.amazonaws.com:5432/d4rf4m0c7tqcab;User ID=hgxpqhmpqxlabi;Password=4RiMskQo0jSLRm91Y-ITj3by1H;';
//var connectionString = 'Host=localhost;Port=5432;Database=100MenWhoCare;User ID=100MenWhoCareAdmin;Password=Osu1991!;';
var db = pgp(cn);

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



