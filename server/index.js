const fs = require('fs')
const exprees = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const aboutInfoModel = require('./modules/aboutInfo')
const skillsModel = require('./modules/skills')
const resumeModel = require('./modules/resume')
const projectsModel = require('./modules/projects')
const app = exprees()
app.use(cors())
app.use(exprees.json())
function connectWithRetry() {
  mongoose.connect('mongodb+srv://nadim99:00962@cluster.i7e5xzt.mongodb.net/crudapp')
    .then(() => {
      console.log('Connecting to DB...');
    })
    .catch((err) => {
      console.error('Failed to connect to DB:', err.message);
      console.log('Retrying connection in 15 sec...');
      setTimeout(connectWithRetry, 15000);
    });
}
connectWithRetry();
const multer = require('multer')
const path = require('path')
// Define the storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, file.originalname + '-' + uniqueSuffix + extension);
    },
  });
  const upload = multer({ storage });
  // POST endpoint to handle file upload
  app.post('/upload', upload.fields([{ name: 'coverFile' }, { name: 'personalFile' }]), (req, res) => {
    try {
      const uploadedCoverFile = req.files['coverFile'] ? req.files['coverFile'][0] : null;
      const uploadedPersonalFile = req.files['personalFile'] ? req.files['personalFile'][0] : null;
      if (!uploadedCoverFile && !uploadedPersonalFile) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      // Handle the uploaded files as per your requirements
      // For example, you can store the file information in a database, etc.

      // Delete the old files if they exist
      const oldCoverFile = req.body.oldCoverImg;
      const oldPersonalFile = req.body.oldPersonalImg;
      const oldCoverPath = "./uploads/" + oldCoverFile;
      const oldPersonalPath = "./uploads/" + oldPersonalFile;
      if (oldCoverFile) {
        fs.unlink(oldCoverPath, (err) => {
          if (err) {
            console.error('Error deleting the file:', err);
          } else {
            console.log('Cover File deleted successfully!');
          }
        });
      }
      if (oldPersonalFile) {
        fs.unlink(oldPersonalPath, (err) => {
          if (err) {
            console.error('Error deleting the file:', err);
          } else {
            console.log('Personal File deleted successfully!');
          }
        });
      }
      const filePathCover = uploadedCoverFile ? uploadedCoverFile.path : null;
      const filePathPersonal = uploadedPersonalFile ? uploadedPersonalFile.path : null;
      console.log('Cover File uploaded successfully:', filePathCover);
      console.log('Personal File uploaded successfully:', filePathPersonal);
      // Send a response to the client
      res.json({ fileName: uploadedCoverFile ? uploadedCoverFile.filename : uploadedPersonalFile.filename });
    } catch (error) {
      console.error('Error uploading the file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////

  // // POST endpoint to handle file upload
  app.post('/uploadimage', upload.fields([{ name: 'coverFile', maxCount: 1 }]), (req, res) => {
    try {
      const uploadedCoverFile = req.files['coverFile'] ? req.files['coverFile'][0] : null;
      const oldCoverFile = req.body.oldCoverImg;
      // Delete the old cover image if it exists
      if (oldCoverFile) {
        const oldCoverPath = './uploads/' + oldCoverFile;
        fs.unlink(oldCoverPath, (err) => {
          if (err) {
            console.error('Error deleting the file:', err);
          } else {
            console.log('Cover File deleted successfully!');
          }
        });
      }
      // Handle the uploaded files as per your requirements
      // For example, you can store the file information in a database, etc.
      const filePathCover = uploadedCoverFile ? uploadedCoverFile.path : null;
      console.log('Cover File uploaded successfully:', filePathCover);
      // Send a response to the client
      res.json({ fileName: uploadedCoverFile ? uploadedCoverFile.filename : null });
    } catch (error) {
      console.error('Error uploading the file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
////////     ////////    //////////
//      //   //               //    
//      //   //               //    
////////     ////////         //    
//           //               //    
//           //               //    
//           ////////         //    
  app.post('/uploadimages', upload.array("imagesFile"), (req, res) => {
    try {
      // console.log(req.body);
      // console.log(req.files);
      // console.log(req.body.oldImages)
      // if (Array.isArray(oldImages)) {
      //   const filenames = oldImages.map((file) => {
      //     return file.oldImages; // Assuming 'name' is the property that contains the filename
      //   });
      //   console.log(filenames);
      // }
      // Delete the old images if they exist
      // oldImages.map((item) => {
        // return item.filename
        // console.log(item.filename);
      // })
      // for (const oldImage of oldImages) {
      //   const oldImagePath = './uploads/' + oldImage;
      //   fs.unlink(oldImagePath, (err) => {
      //     if (err) {
      //       console.error('Error deleting the file:', err);
      //     } else {
      //       console.log('Image File deleted successfully!');
      //     }
      //   });
      // }
      // Handle the uploaded files as per your requirements
      // For example, you can store the file information in a database, etc.
      // for (const uploadedImageFile of uploadedImagesFiles) {
      //   const imagePath = uploadedImageFile.path;
      //   console.log('Image File uploaded successfully:', imagePath);
      //   // Handle the image files as per your requirements
      //   // For example, you can store the file information in a database, etc.
      // }
      // Send a response to the client
      res.json({ fileName: req.files});
    } catch (error) {
      console.error('Error uploading the file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////
                                          //////
                                          //////
                                          //////
                                          //////

//about R
app.get('/aboutData', (req, res)=>{
    aboutInfoModel.find({})
    .then((aboutInfo) => {
        res.json(aboutInfo);
    })
    .catch((err) => {
        res.json(err)
    })
})

// about U
app.put("/updatedata/:id", (req, res) => {
  const id = req.params.id;
  aboutInfoModel.findByIdAndUpdate({_id:id}, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      aboutMe: req.body.aboutMe,
      footerAbout: req.body.footerAbout,
      cvLink: req.body.cvLink,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      linkedin: req.body.linkedin,
      youtube: req.body.youtube,
      instagram: req.body.instagram,
      whatsapp: req.body.whatsapp,
      telegram: req.body.telegram,
      personalImg: req.body.personalImg,
      coverImg: req.body.coverImg
  })
  .then((aboutdata) => {
      res.json(aboutdata)
  })
  .catch((err) => {
      res.json(err)
  })
})
                                          //////
                                          //////
                                          //////
                                          //////
//////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////
                                          //////
                                          //////
                                          //////
                                          //////
// resume C
app.put('/addresumedata', async (req, res) => {
  const {
    category,
    title,
    description,
    dateFrom,
    dateTo,
    link,
    linkContent,
    logo
  } = req.body;
  try {
    // Create a new document using the 'resumeModel'
    const newResumeData = new resumeModel({
      category,
      title,
      description,
      dateFrom,
      dateTo,
      link,
      linkContent,
      logo
    });
    // Save the new document to the database
    const result = await newResumeData.save();
    res.status(201).json({ message: 'Data inserted successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to insert data', error: error.message });
  }
});

// resume R
app.get('/resumeData', (req, res)=>{
    resumeModel.find({})
    .then((resume) => {
        res.json(resume);
    })
    .catch((err) => {
        res.json(err)
    })
})

// resume U
app.put("/updateresumedata/:id", (req, res) => {
  const id = req.params.id;
  resumeModel.findByIdAndUpdate({_id:id}, {
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      link: req.body.link,
      linkContent: req.body.linkContent,
      logo: req.body.logo   
  })
  .then((resumedata) => {
      res.json(resumedata)
  })
  .catch((err) => {
      res.json(err)
  })
})

// resume D

app.delete('/deleteresumedata/:id', async (req, res) => {
  const resumeId = req.params.id;

  try {
    // Find the document by ID and delete it using the 'resumeModel'
    const deletedData = await resumeModel.findByIdAndDelete(resumeId);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully', data: deletedData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete data', error: error.message });
  }
});

                                          //////
                                          //////
                                          //////
                                          //////
//////////////////////////////////////////////////////////////////////////////////////////

// skills C

app.put('/addskillsdata', async (req, res) => {
  const {
    category,
    name,
    per,
    shownText
  } = req.body;
  try {
    // Create a new document using the 'resumeModel'
    const newSkillsData = new skillsModel({
      category,
      name,
      per,
      shownText
    });
    // Save the new document to the database
    const result = await newSkillsData.save();
    res.status(201).json({ message: 'Data inserted successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to insert data', error: error.message });
  }
});



// skills R
app.get('/skillsData', (req, res)=>{
    skillsModel.find({})
    .then((skills) => {
        res.json(skills);
    })
    .catch((err) => {
        res.json(err)
    })
})


// Skills U
app.put("/updateskillsData/:id", (req, res) => {
  const id = req.params.id;
  skillsModel.findByIdAndUpdate({_id:id}, {
      category: req.body.category,
      name: req.body.name,
      per: req.body.per,
      shownText: req.body.shownText
  })
  .then((skillsData) => {
      res.json(SkillsData)
  })
  .catch((err) => {
      res.json(err)
  })
})


// skills D

app.delete('/deleteskillsdata/:id', async (req, res) => {
  const resumeId = req.params.id;

  try {
    // Find the document by ID and delete it using the 'resumeModel'
    const deletedData = await skillsModel.findByIdAndDelete(resumeId);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully', data: deletedData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete data', error: error.message });
  }
});

                                          //////
                                          //////
                                          //////
                                          //////
//////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////
                                          //////
                                          //////
                                          //////
                                          //////








// projects R
app.get('/projectsData', (req, res)=>{
    projectsModel.find({})
    .then((projects) => {
        res.json(projects);
    })
    .catch((err) => {
        res.json(err)
    })
})



// project U
app.put("/updateprojectdata/:id", (req, res) => {
  const id = req.params.id;
  projectsModel.findByIdAndUpdate({_id:id}, {
      title: req.body.title,
      summry: req.body.summry,
      description: req.body.description,
      date: req.body.date,
      srcLink: req.body.srcLink,
      shownText: req.body.shownText,
      coverImg: req.body.coverImg,
      images: req.body.imagesFiles
  })
  .then((projectdata) => {
      res.json(projectdata)
  })
  .catch((err) => {
      res.json(err)
  })
})
                                          //////
                                          //////
                                          //////
                                          //////
//////////////////////////////////////////////////////////////////////////////////////////















// app.get('/getUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findById({_id:id})
//     .then((users) => {
//         res.json(users)
//     })
//     .catch((err) => {
//         res.json(err)
//     })
// })
// app.post("/createUser", (req, res) => {
//     UserModel.create(req.body)
//     .then((users)=>{
//         res.json(users)
//     })
//     .catch((err)=>{
//         res.json(err) 
//     })
// })




// app.delete("/deleteUser/:id", (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({_id:id})
//     .then((res) => {
//         res.json(res)
//     })
//     .catch((err) => {
//         res.json(err)
//     })
// })







const PORT = 3001
app.listen(3001, ()=>{
    console.log("server in running on port: " + PORT);
})