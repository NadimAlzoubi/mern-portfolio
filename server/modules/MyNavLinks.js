const mongoose = require('mongoose')

const MyNavLinksSchema = new mongoose.Schema({     
    key: String,
    title: String,
    element: String,
    link: String
})

const MyNavLinksModel = mongoose.model("mynavlinks", MyNavLinksSchema);
module.exports = MyNavLinksModel;