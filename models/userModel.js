const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please add the user Email"],
        unique: [true, "The Email add is already resister"]
    },
    password: {
        type: String,
        required: [true, "Please add the user Password"]
    },
}, {
    timestamps: true
}
)


module.exports = mongoose.model('User', userSchema)