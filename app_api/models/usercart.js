/**
 * Created by awaleg on 28/09/17.
 */
var mongoose = require( 'mongoose' );
console.log('In users cart');

var userCartSchema = new mongoose.Schema({
    useremail: {
        type: String,
        unique: true,
        required: true
    },
    bookids: {
        type: String,
        required: true
    }
});

mongoose.model('userCart', userCartSchema);
