const fs = require('fs-extra');
const multer = require('multer');
const path = require('path');
const exprees = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const aboutInfoModel = require('./modules/aboutInfo')
const skillsModel = require('./modules/skills')
const resumeModel = require('./modules/resume')
const projectsModel = require('./modules/projects')
const loginModel = require('./modules/login')
const app = exprees()
app.use(cors())
app.use(exprees.json())
app.use(bodyParser.json());
function connectWithRetry() {
  mongoose.connect(process.env.REACT_APP_MONGO_URI)
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

const fsUpload = multer({ dest: 'uploads/' });


// API endpoint to get the list of files in a folder
app.get('/fsfiles', async (req, res) => {
  try {
    const files = await fs.readdir('uploads');
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const stats = await fs.stat(path.join('uploads', file));
        return {
          name: file,
          size: stats.size,
        };
      })
    );
    res.json(fileDetails);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read files.' });
  }
});

// API endpoint to delete a file
app.delete('/fsfiles/:filename', async (req, res) => {
  const { filename } = req.params;
  try {
    await fs.promises.unlink(path.join('uploads', filename));
    res.json({ message: 'File deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the file.' });
  }
});









// Route to serve index.html
app.get('/', (req, res) => {
  const titleData = 'Your Page Title'; // This can be dynamic data fetched from the database or any other source
  res.render('index', { title: titleData });
});









// login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginModel.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      if (user.password === password) {
        res.json({ username: user.username });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  } catch (error) {
    console.error('Failed to login:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
const { log } = require('util');
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
  app.post('/upload', upload.fields([{ name: 'coverFile' }, { name: 'personalFile' }, { name: 'cvFile' }]), (req, res) => {
    try {
      const uploadedCoverFile = req.files['coverFile'] ? req.files['coverFile'][0] : null;
      const uploadedPersonalFile = req.files['personalFile'] ? req.files['personalFile'][0] : null;
      const uploadedCvFile = req.files['cvFile'] ? req.files['cvFile'][0] : null;
      if (!uploadedCoverFile && !uploadedPersonalFile && !uploadedCvFile) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      // Handle the uploaded files as per your requirements
      // For example, you can store the file information in a database, etc.
      // Delete the old files if they exist
      const oldCoverFile = req.body.oldCoverImg;
      const oldPersonalFile = req.body.oldPersonalImg;
      const oldCvFile = req.body.oldCvFile;
      const oldCoverPath = "./uploads/" + oldCoverFile;
      const oldPersonalPath = "./uploads/" + oldPersonalFile;
      const oldCvPath = "./uploads/" + oldCvFile;
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
      if (oldCvFile) {
        fs.unlink(oldCvPath, (err) => {
          if (err) {
            console.error('Error deleting the file:', err);
          } else {
            console.log('Cv File deleted successfully!');
          }
        });
      }
      const filePathCover = uploadedCoverFile ? uploadedCoverFile.path : null;
      const filePathPersonal = uploadedPersonalFile ? uploadedPersonalFile.path : null;
      const filePathCv = uploadedCvFile ? uploadedCvFile.path : null;
      console.log('Cover File uploaded successfully:', filePathCover);
      console.log('Personal File uploaded successfully:', filePathPersonal);
      console.log('Cv File uploaded successfully:', filePathCv);
      // Send a response to the client
      if(uploadedCoverFile){
        res.json({ 
          coverFileName: uploadedCoverFile.filename
        });
      } 
      if(uploadedPersonalFile){
        res.json({ 
          personalFileName: uploadedPersonalFile.filename
        });
      } 
      if(uploadedCvFile){
        res.json({ 
          cvFileName: uploadedCvFile.filename
        });
      } 
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
      // Send a response to the client
      res.json({ fileName: req.files});
    } catch (error) {
      console.error('Error uploading the file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
//////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
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
      res.json(skillsData)
  })
  .catch((err) => {
      res.json(err)
  })
})
// skills D
app.delete('/deleteskillsdata/:id', async (req, res) => {
  const skillId = req.params.id;
  try {
    // Find the document by ID and delete it
    const deletedData = await skillsModel.findByIdAndDelete(skillId);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully', data: deletedData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete data', error: error.message });
  }
});
                                          //////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
                                          //////
  // projects C
  app.put('/addprojectdata', async (req, res) => {
    const {
      title,
      summry,
      description,
      date,
      srcLink,
      shownText,
      coverImg,
      imagesFiles
    } = req.body;
    try {
      // Create a new document using the 'resumeModel'
      const newProjectData = new projectsModel({
        title,
        summry,
        description,
        date,
        srcLink,
        shownText,
        coverImg,
        imagesFiles
      });
      // Save the new document to the database
      const result = await newProjectData.save();
      res.status(201).json({ message: 'Data inserted successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Failed to insert data', error: error.message });
    }
  });
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
// project D
app.delete('/deleteprojectsdata/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    // Find the document by ID and delete it using the 'resumeModel'
    const deletedData = await projectsModel.findByIdAndDelete(projectId);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully', data: deletedData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete data', error: error.message });
  }
});
                                          //////
//////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.REACT_APP_PORT
app.listen(process.env.REACT_APP_PORT, ()=>{
    console.log("server in running on port: " + PORT);
})