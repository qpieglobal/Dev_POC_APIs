const express = require('express');
const app=express();
const port=process.env.API_PORT||3000;
const uo=require('./userObjects.js');
const db=require('./db.js');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

user1=new uo();
app.get('/', (req,res)=>{
res.send('first api')
});

app.get('/users', db.getAllUsers);

app.get('/user/:id', db.getUserProfile_details);

app.get('/username-email/:id', db.getUserNameEmail);

//app.post('/createuser/', db.createUser);
app.post('/createuser/', (req,res)=>{
    user1.createUser(req,res);

});

app.put('/user/:id', db.updateUser);

app.get('/user/:id', db.getUser_image);

app.listen(port,()=>{console.log(`listening at http://localhost:${port}/`)});
