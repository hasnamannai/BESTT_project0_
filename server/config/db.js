const mongoose = require('mongoose');

const connectDB = async()=>{
    mongo_URI= 'mongodb+srv://hasna:univers.1@cluster0.lozuvhw.mongodb.net/Bestt?retryWrites=true&w=majority'

    const conn =await mongoose.connect(mongo_URI);

    
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);


};
module.exports= connectDB;