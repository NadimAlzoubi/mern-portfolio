const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({        
    key: String,
    category: String,
    title: String,
    description: String,
    dateFrom: String,
    dateTo: String,
    link: String,
    linkContent: String,
    logo: String
})

const resumeModel = mongoose.model("resumes", resumeSchema);
module.exports = resumeModel;