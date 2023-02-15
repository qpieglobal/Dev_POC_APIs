const mysql=require('mysql2');
const pool=mysql.createPool({
    connectionLimit     :10,
    host                :'localhost',
    database            :'qpie_user',
    user                :'root',
    password            :'Sekhar_123',
    port                :'3306'
});


function getAllUsers(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
       // return connection;
    
    conn.query('select * from qpie_user.user', (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching all users: ${err}`);
            throw err;
        }
        });
    });
};

function getUserProfile_details(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
        
    conn.query('select * from qpie_user.user where user_id=?',[req.params.id], (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching user-${req.params.id}: ${err}`);
            throw err;
        }
        });
    });
};

function createUser(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    const vals=[req.body.user_id,req.body.mobile_number];
    conn.query('insert into qpie_user.user(user_id,mobile_number) values(?,?)',vals, (err,results)=> {
        conn.release();
        if(!err){
            res.send( {"message":`user record ${req.body.user_id} has been created`});
        }else{
            console.log(`error while creating user: ${err}`);
            throw err;
        }
        });
    });
};

function createUser2(user_data){
    pool.getConnection((err,conn)=>{
        if(err) {
            console.log(err);
            return {"status":1,"message":err};            
        };
        console.log(`connected as id: ${conn.threadId}`);
    const vals=[user_data.user_id,user_data.mobile_number];
    conn.query('insert into qpie_user.user(user_id,mobile_number) values(?,?)',vals, (err,results)=> {
        conn.release();
        if(!err){
            return {"status":0,"message":`user record ${user_data.user_id} has been created`};
        }else{
            console.log(`error while creating user: ${err}`);
            return {"status":1,"message":err};
        }
        });
    });
};

function getUser_image(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    conn.query('select profile_picture qpie_user.user where user_id=?',req.params.id, (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching profile picture url: ${err}`);
            throw err;
        }
        });
    });
};

function get_followers_count(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    conn.query("select count(user_id) as followers_count qpie_user.user_following where follow_status='Y' and following_user=?",req.params.id, (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching profile picture url: ${err}`);
            throw err;
        }
        });
    });
};

function get_following_count(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    conn.query("select count(following_user) as following_count qpie_user.user_following where follow_status='Y' and user_id=?",req.params.id, (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching profile picture url: ${err}`);
            throw err;
        }
        });
    });
};

function List_of_followers(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    conn.query("select user_id,first_name,last_name from qpie_user.user where user_id in (select user_id qpie_user.user_following where follow_status='Y' and following_user=?)",req.params.id, (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching profile picture url: ${err}`);
            throw err;
        }
        });
    });
};

function List_of_following(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    conn.query("select user_id,first_name,last_name from qpie_user.user where user_id in (select following_user qpie_user.user_following where follow_status='Y' and user_id=?)",req.params.id, (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching profile picture url: ${err}`);
            throw err;
        }
        });
    });
};

function getUserNameEmail(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    conn.query("select user_id,first_name,last_name,email_id from qpie_user.user where user_id=?",req.params.id, (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching profile picture url: ${err}`);
            throw err;
        }
        });
    });
};

function updateUser(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    var sql="update qpie_user.user set ";
    var i=1
    var vals=[]
    for (var k in req.body) {
        if (i < Object.keys(req.body).length){
            sql += `${k}=?,`;
        }else{
            sql += `${k}=?`;
        }
        vals.push(req.body[k]); 
        i++       
    };
    vals.push(req.params.id);
    sql+=`,last_modified_date=UTC_TIMESTAMP where user_id=?`
    conn.query(sql,vals, (err,results)=> {
        conn.release();
        if(!err){
            res.send( {"message":`user record ${req.params.id} has been updated`});
        }else{
            console.log(`error while updating user data: ${err}`);
            throw err;
        }
        });
    });
};
module.exports= {getAllUsers,
                updateUser,
                getUserNameEmail,
                List_of_followers,
                List_of_following, 
                getUserProfile_details, 
                createUser,
                createUser2,
                getUser_image,
                get_followers_count,
                get_following_count,
                pool};
