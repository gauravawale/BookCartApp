/**
 * Created by awaleg on 26/09/17.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var userCart = mongoose.model('userCart');
var bookInventory = mongoose.model('bookInventory');

module.exports.profileRead = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }

};

module.exports.setCurrentCart = function (req, res) {
    userCart.findOneAndUpdate(
        {
            "useremail": req.body.useremail
        },
        {
            "$set": {
                "useremail": req.body.useremail,
                "bookids": req.body.cartItems
            }
        },
        {
            new:true, upsert: true
        },
        function(err, doc) {
            if (err)
                throw err; // handle error;
        }
    );

};

module.exports.getCurrentCart = function (req, res) {
    console.log('err');
    //console.log(req);
    userCart.findOne(
        {
            "useremail": req.body.email
        },
        function(err, obj) {
            //console.log(err);
            //console.log(obj);
            if (err)
                throw err; // handle error;
            res.status(200).json(obj);
        }
    );
}


module.exports.getBooksInventory = function (req, res) {
    console.log('getBooksInventory');
    console.log(bookInventory.collection.collectionName);
    bookInventory.find(
        {},
        function(err, obj) {
            console.log(err);
            console.log(obj);
            if (err)
                throw err; // handle error;
            res.status(200).json(obj);
        }
    );
}