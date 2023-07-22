const mongoose = require('mongoose')

const skillsSchema = new mongoose.Schema({     
    key: String,
    category: String,
    name: String,
    per: String,
    shownText: String
})

const skillsModel = mongoose.model("skills", skillsSchema);
module.exports = skillsModel;