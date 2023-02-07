const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Add a name']
    },
    email: {
        type: String,
        required: [true, 'Please Add a email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please Add a phone'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Add a password']
    },
   
},{
    timestamps: true
})


module.exports = mongoose.model('User',UserSchema)