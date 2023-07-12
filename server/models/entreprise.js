const mongoose= require('mongoose')
const entrepriseSchema= new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
    },
    adresse:{
        type:String
    },
    phone:{
        type : String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
module.exports=mongoose.model('entreprise',entrepriseSchema)