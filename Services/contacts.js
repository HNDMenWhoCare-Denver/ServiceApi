/**
 * Created by SJClark on 10/15/2016.
 */
var promise = require('bluebird');
var fs = require("fs");
var send = require("../mail/send");

var options = {
    // Initialization Options
    promiseLib: promise
};
/*
var cnl = {
    host: 'localhost',
    port: 5433,
    database: '100MenWhoCare',
    user: '100MenWhoCareAdmin',
};
 */
var cn = {
    host: 'ec2-174-129-3-207.compute-1.amazonaws.com', // server name or IP address;
    port: 5432,
    database: 'd4rf4m0c7tqcab',
    user: 'hgxpqhmpqxlabi',
    password: '4RiMskQo0jSLRm91Y-ITj3by1H',
    ssl: true
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/100MenWhoCare;User ID=100MenWhoCareAdmin;Password=Osu1991!;';
//var connectionString = 'Host=localhost;Port=5432;Database=100MenWhoCare;UserId=100MenWhoCareAdmin;Password=Osu1991!;'
//var connectionString = 'postgres://localhost:5432/100MenWhoCare;User ID=100MenWhoCareAdmin;Password=Osu1991!;';
//var connectionString = 'postgres://hgxpqhmpqxlabi:4RiMskQo0jSLRm91Y-ITj3by1H@ec2-174-129-3-207.compute-1.amazonaws.com:5432/d4rf4m0c7tqcab;User ID=hgxpqhmpqxlabi;Password=4RiMskQo0jSLRm91Y-ITj3by1H;';
var db = pgp(cn);

// add query functions



module.exports = {
    getAllContacts: getAllContacts,
    getSingleContact: getSingleContact,
    createContact: createContact,
    updateContact: updateContact,
    removeContact: removeContact
};

function getAllContacts(req, res, next) {
    pgp.pg.defaults.ssl = true;
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
    var email = req.body.email;
    db.none('insert into "Contacts"("FirstName", "LastName", "Email", "Phone", "Organization", "Message","Newsletter","ReceiveEmails","Created" )' +
        'values( ${firstName}, ${lastName}, ${email}, ${phone}, ${organization}, ${message},${newsletter},${receiveEmails},${created})',
        req.body)
        .then(function () {
            sendEmail(email)
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one contact',
                    email: email
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
function sendEmail(email){
   // var helper = require('sendgrid').mail
    send.sendExternalEmail('sjclark88@gmail.com',email,'Welcome to OneHundrenMenWhoCare-Denver','Welcome to OneHundrenMenWhoCare-Denver');
   // from_email = new helper.Email("test@example.com")
   // to_email = new helper.Email("test@example.com")
  //  subject = "Hello World from the SendGrid Node.js Library"
   // content = new helper.Content("text/plain", "some text here")
   // mail = new helper.Mail(from_email, subject, to_email, content)
   // email = new helper.Email("test2@example.com")
   // mail.personalizations[0].addTo(email)

   // return mail.toJSON()
}
