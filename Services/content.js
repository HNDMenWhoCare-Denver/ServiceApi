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
    getAllContents: getAllContents,
    getSingleContent: getSingleContent,
    createContent: createContent,
    updateContent: updateContent,
    removeContent: removeContent
};

function getAllContents(req, res, next) {
    db.any('SELECT * FROM "Contents";')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL contents'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}



function getSingleContent(req, res, next) {
    var contactID = parseInt(req.params.id);
    db.one('SELECT * FROM "Contents" where "Id" = $1', contactID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE content'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createContent(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into "Contents"("Title", "Content","Created","CreatedBy" )' +
        'values(${title}, ${content}, ${created}, ${createdby})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one content'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateContent(req, res, next) {
    db.none('update "Contents" set "Title"=$1, "Content"=$2  where "Id"=$3',
        [req.body.title, req.body.content, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated content'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeContent(req, res, next) {
    var contactID = parseInt(req.params.id);
    db.result('delete from "Contents" where "Id" = $1', contactID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed content`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}
