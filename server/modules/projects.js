const mongoose = require('mongoose')

const projectsSchema = new mongoose.Schema({  
    key: String,
    title: String,
    summry: String,
    description: String,
    date: String,
    srcLink: String,
    shownText: String,
    coverImg: String,
    images: Array
})

const projectsModel = mongoose.model("projects", projectsSchema);
module.exports = projectsModel;