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
    getAllEvents: getAllEvents,
    getSingleEvent: getSingleEvent,
    createEvent: createEvent,
    updateEvent: updateEvent,
    removeEvent: removeEvent
};

function getAllEvents(req, res, next) {
    db.any('SELECT * FROM "Events";')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL events'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}



function getSingleEvent(req, res, next) {
    var eventID = parseInt(req.params.id);
    db.one('SELECT * FROM "Events" where "Id" = $1', eventID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE event'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createEvent(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into "Events"("Name", "Start", "End", "Description",  "Created" )' +
        'values( ${name}, ${start}, ${end}, ${description}, ${created})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one event'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateEvent(req, res, next) {
    db.none('update "Events" set "Name"=$1, "Start"=$2, "End"=$3, "Description"=$4, "Created"=$5 where "Id"=$6',
        [req.body.name, req.body.start, req.body.end,
            req.body.description, req.body.created, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated event'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeEvent(req, res, next) {
    var eventID = parseInt(req.params.id);
    db.result('delete from "Events" where "Id" = $1', eventID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed event`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}

