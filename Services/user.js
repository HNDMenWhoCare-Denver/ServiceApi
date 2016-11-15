/**
 * Created by SJClark on 10/29/2016.
 */
/**
 * Created by SJClark on 10/15/2016.
 */
var promise = require('bluebird');
var fs = require("fs");

var options = {
    // Initialization Options
    promiseLib: promise
};

var cn = {
    host: 'localhost',
    port: 5433,
    database: '100MenWhoCare',
    user: '100MenWhoCareAdmin',
};

var cn = {
    host: 'ec2-174-129-3-207.compute-1.amazonaws.com', // server name or IP address;
    port: 5432,
    database: 'd4rf4m0c7tqcab',
    user: 'hgxpqhmpqxlabi',
    password: '4RiMskQo0jSLRm91Y-ITj3by1H'
};


var pgp = require('pg-promise')(options);
var connectionString ='postgres://100MenWhoCareAdmin:Osu1991!@localhost:5432/100MenWhoCare';
var db = pgp(cn);

// add query functions

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser
};

function getAllUsers(req, res, next) {
    db.any('SELECT * FROM "Users";')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL users'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}



function getSingleUser(req, res, next) {
    var contactID = parseInt(req.params.id);
    db.one('SELECT * FROM "Users" where "Id" = $1', contactID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createUser(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into "Users"("FirstName", "LastName", "Role",  "Created" )' +
        'values(${firstName}, ${lastName}, ${role}, ${created})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateUser(req, res, next) {
    db.none('update "Users" set "FirstName"=$1, "LastName"=$2, "Role"=$3 where "Id"=$4',
        [req.body.firstName, req.body.lastName, req.body.role,
         parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeUser(req, res, next) {
    var contactID = parseInt(req.params.id);
    db.result('delete from "Users" where "Id" = $1', contactID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed user`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}
