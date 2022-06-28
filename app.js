// initialize 
const http = require('http');
const express = require('express');
const sequelize = require('./util/db')
const app = express();
const routeAdmin = require('./routes/admin')
const User = require('./models/user')
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user
        console.log(user.id);
        next();
    })
    .catch(err=>console.log(err));
})
// initialize routes
app.use('/admin',routeAdmin)


// create connection to server
const server = http.createServer(app);


// running server
server.listen(3000);