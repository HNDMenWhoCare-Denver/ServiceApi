/**
 * Created by SJClark on 1/3/2017.
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
    password: '4RiMskQo0jSLRm91Y-ITj3by1H',
    ssl: true
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/100MenWhoCare;User ID=100MenWhoCareAdmin;Password=Osu1991!;';
//var connectionString = 'Host=localhost;Port=5432;Database=100MenWhoCare;UserId=100MenWhoCareAdmin;Password=Osu1991!;'
var connectionString ='postgres://100MenWhoCareAdmin:Osu1991!@localhost:5432/100MenWhoCare';
var db = pgp(cn);

// add query functions

module.exports = {
    getAllContentPlacements: getAllContentPlacements,
    getSingleContentPlacement: getSingleContentPlacement,
    createContentPlacement: createContentPlacement,
    updateContentPlacement: updateContentPlacement,
    removeContentPlacement: removeContentPlacement,
    getContentPlacementsByPageId: getContentPlacementsByPageId
};

function getAllContentPlacements(req, res, next) {
    db.any('SELECT * FROM "ContentPlacement";')
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



function getSingleContentPlacement(req, res, next) {
    var contentPlacementID = parseInt(req.params.id);
    db.one('SELECT * FROM "ContentPlacement" where "Id" = $1', contentPlacementID)
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

function getContentPlacementsByPageId(req, res, next) {
    var pageID = parseInt(req.params.page);
    db.one('SELECT * FROM "ContentPlacement" where "Page" = $1', pageID)
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

function createContentPlacement(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into "ContentPlacement"("Page", "Column", "Row", "ContentId", "IsActive", "ContentUseType" )' +
        'values(${page}, ${column}, ${row},${contentId}, ${isActive}, ${contentUseType})',
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

function updateContentPlacement(req, res, next) {
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

function removeContentPlacement(req, res, next) {
    var contentPlacementID = parseInt(req.params.id);
    db.result('delete from "Contents" where "Id" = $1', contentPlacementID)
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
