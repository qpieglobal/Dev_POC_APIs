const express = require('express');
const app=express();
const port=process.env.API_PORT||3000;
const uo=require('./userObjects.js');
//const db=require('./db.js');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

user1=new uo();
app.get('/', (req,res)=>{
res.send('first api')
});

app.get('/users', (req,res)=>{
    user1.getAllUsers(req,res);
});

app.get('/user/:id', (req,res)=>{
    user1.getUserProfileDetails(req,res);
});

app.get('/username-email/:id',(req,res)=>{
    user1.getUserNameEmail(req,res)
});

//app.post('/createuser/', db.createUser);
app.post('/createuser/', (req,res)=>{
    user1.createUser(req,res);

});

app.put('/user/:id', (req,res)=>{
    user1.updateUser(req,res);
});

app.get('/userimage/:id', (req,res)=>{
    user1.getUserImage(req,res);
});

app.listen(port,()=>{console.log(`listening at http://localhost:${port}/`)});
