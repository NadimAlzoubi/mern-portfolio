const mongoose = require('mongoose')

const aboutInfoSchema = new mongoose.Schema({  
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    aboutMe: String,
    footerAbout: String,
    cvLink: String,
    address: String,
    phone: String,
    email: String,
    linkedin: String,
    youtube: String,
    facebook: String,
    instagram: String,
    whatsapp: String,
    telegram: String,
    personalImg: String,
    coverImg: String
})

const aboutInfoModel = mongoose.model("aboutInfos", aboutInfoSchema);
module.exports = aboutInfoModel;