// initialize 
const path = require('path');
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('./util/db')
const app = express();
const routeAdmin = require('./routes/admin')
const routeUser = require('./routes/user')
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware')

const User = require('./models/user')

const bodyParser = require('body-parser')

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4()+ path.extname(file.originalname))
    }
});


const fileFilter = (req,file,cb)=>{
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}


dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('img')
);

app.use('/images', express.static(path.join(__dirname, 'images')));
// Allowing CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



// app.use((req,res,next)=>{
//     User.findByPk(1)
//     .then(user=>{
//         req.user = user
//         console.log(user.id);
//         next();
//     })
//     .catch(err=>console.log(err));
// })
// initialize routes
app.use('/api/login',authController.login);
app.use('/api/register',authController.register);
app.use('/api/user',authMiddleware.authorize(),routeUser);
app.use('/api/admin',authMiddleware.authorize("admin"),routeAdmin)

// create connection to server
const server = http.createServer(app);


// running server
server.listen(process.env.PORT);