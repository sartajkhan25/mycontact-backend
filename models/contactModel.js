const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true, "Please add a contact name"],
    },
    email:{
        type:String,
        required:[true, "Please add a Email address"],
    },
    phone:{
        type:String,
        required:[true, "Please add a Mobile number"],
    }
},{
    timestamps:true
}
)


module.exports = mongoose.model('Contact',contactSchema)

