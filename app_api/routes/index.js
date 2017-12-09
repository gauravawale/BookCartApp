/**
 * Created by awaleg on 26/09/17.
 */

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/setcurrentcart', ctrlProfile.setCurrentCart);
router.post('/getcurrentcart', ctrlProfile.getCurrentCart);

console.log(ctrlProfile);
router.post('/getbookinventory', ctrlProfile.getBooksInventory);

module.exports = router;