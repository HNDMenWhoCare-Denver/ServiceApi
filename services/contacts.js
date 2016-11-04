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

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/100MenWhoCare;User ID=100MenWhoCareAdmin;Password=Osu1991!;';
//var connectionString = 'Host=localhost;Port=5432;Database=100MenWhoCare;UserId=100MenWhoCareAdmin;Password=Osu1991!;'
var connectionString ='postgres://100MenWhoCareAdmin:Osu1991!@localhost:5432/100MenWhoCare';
var db = pgp(connectionString);

// add query functions

module.exports = {
    getAllContacts: getAllContacts,
    getSingleContact: getSingleContact,
    createContact: createContact,
    updateContact: updateContact,
    removeContact: removeContact
};

function getAllContacts(req, res, next) {
    db.any('SELECT * FROM "Contacts";')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL contacts'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}



function getSingleContact(req, res, next) {
    var contactID = parseInt(req.params.id);
    db.one('SELECT * FROM "Contacts" where "Id" = $1', contactID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE contact'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createContact(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into "Contacts"("FirstName", "LastName", "Email", "Phone", "Organization", "Newsletter","Created" )' +
        'values( ${firstName}, ${lastName}, ${email}, ${phone}, ${organization}, ${newsletter},${created})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one contact'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateContact(req, res, next) {
    db.none('update "Contacts" set "FirstName"=$1, "LastName"=$2, "Email"=$3, "Phone"=$4, "Organization"=$5, "Newsletter"=$6 where "Id"=$7',
        [req.body.firstName, req.body.lastName, req.body.email,
            req.body.phone, req.body.organization, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated contact'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeContact(req, res, next) {
    var contactID = parseInt(req.params.id);
    db.result('delete from "Contacts" where "Id" = $1', contactID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed contact`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}
