/**
 * Created by awaleg on 08/10/17.
 */
var mongoose = require( 'mongoose' );
console.log('In users');
var bookInventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publication: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});



mongoose.model('bookInventory', bookInventorySchema);