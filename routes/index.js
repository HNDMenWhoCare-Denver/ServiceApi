var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


var db = require('../Services/contacts');
var db = require('../Services/users');
var db = require('../Services/events');
var db = require('../Services/contents');


router.get('/api/contacts', db.getAllContacts);
router.get('/api/contacts/:id', db.getSingleContact);
router.post('/api/contacts', db.createContact);
router.put('/api/contacts/:id', db.updateContact);
router.delete('/api/contacts/:id', db.removeContact);

router.get('/api/users', db.getAllUsers);
router.get('/api/users/:id', db.getSingleUser);
router.post('/api/users', db.createUser);
router.put('/api/users/:id', db.updateUser);
router.delete('/api/users/:id', db.removeUser);

router.get('/api/events', db.getAllEvents);
router.get('/api/events/:id', db.getSingleEvent);
router.post('/api/events', db.createEvent);
router.put('/api/events/:id', db.updateEvent);
router.delete('/api/events/:id', db.removeEvent);

router.get('/api/contents', db.getAllContents);
router.get('/api/contents/:id', db.getSingleContent);
router.post('/api/contents', db.createContent);
router.put('/api/contents/:id', db.updateContent);
router.delete('/api/contents/:id', db.removeContent);




module.exports = router;
