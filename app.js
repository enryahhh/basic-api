// initialize 
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const sequelize = require('./util/db')
const app = express();
const routeAdmin = require('./routes/admin')
const routeUser = require('./routes/user')
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware')

const User = require('./models/user')

const bodyParser = require('body-parser')

dotenv.config();
app.use(express.json());

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


app.use(bodyParser.urlencoded({extended:false}));
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