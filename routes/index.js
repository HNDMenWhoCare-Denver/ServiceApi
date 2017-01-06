var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


var dbc = require('../Services/contacts');
var dbu = require('../Services/user');
var dbe = require('../Services/event');
var dbt = require('../Services/content');
var dbcp = require('../Services/contentPlacement');


router.get('/api/contacts', dbc.getAllContacts);
router.get('/api/contacts/:id', dbc.getSingleContact);
router.post('/api/contacts', dbc.createContact);
router.put('/api/contacts/:id', dbc.updateContact);
router.delete('/api/contacts/:id', dbc.removeContact);

router.get('/api/users', dbu.getAllUsers);
router.get('/api/users/:id', dbu.getSingleUser);
router.post('/api/users', dbu.createUser);
router.put('/api/users/:id', dbu.updateUser);
router.delete('/api/users/:id', dbu.removeUser);

router.get('/api/events', dbe.getAllEvents);
router.get('/api/events/:id', dbe.getSingleEvent);
router.post('/api/events', dbe.createEvent);
router.put('/api/events/:id', dbe.updateEvent);
router.delete('/api/events/:id', dbe.removeEvent);

router.get('/api/contents', dbt.getAllContents);
router.get('/api/contents/:id', dbt.getSingleContent);
router.post('/api/contents', dbt.createContent);
router.put('/api/contents/:id', dbt.updateContent);
router.delete('/api/contents/:id', dbt.removeContent);

router.get('/api/contentplacements', dbcp.getAllContentPlacements);
router.get('/api/contentplacements/:id', dbcp.getSingleContentPlacement);
router.get('/api/contentplacementsbypage/:page', dbcp.getContentPlacementsByPageId);
router.post('/api/contentplacements', dbcp.createContentPlacement);
router.put('/api/contentplacements/:id', dbcp.updateContentPlacement);
router.delete('/api/contentplacements/:id', dbcp.removeContentPlacement);






module.exports = router;
