const mysql=require('mysql2');
const pool=mysql.createPool({
    connectionLimit     :10,
    host                :'localhost',
    database            :'qpie_qa',
    user                :'root',
    password            :'Sekhar_123',
    port                :'3306'
});


function getUserQuestions(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
       // return connection;
    
    conn.query("select uq.question_id,q.description,q.create_date,(select count(answer_id) from qpie_qa.answers a where a.question_id=uq.question_id) NO_OF_ANSWERS from qpie_qa.user_questions uq, qpie_qa.questions q where uq.question_id=q.question_id and nvl(uq.delete_question,'N')='N' and uq.user_id=?",req.params.id, (err,results)=> {
        conn.release();
        if(!err){
            res.send(results);
        }else{
            console.log(`error while fetching user posted questions: ${err}`);
            throw err;
        }
        });
    });
};

function getUserQuestionCnt(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
        
    conn.query('select count(question_id) posetd_question_cnt from qpie_qa.user_questions where user_id=?',req.params.id, (err,results)=> {
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

function getUserAnswers(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    const vals=[req.body.user_id,req.body.mobile_number];
    conn.query("select ua.question_id,q.description,q.create_date,(select count(answer_id) from qpie_qa.answers a where a.question_id=ua.question_id) NO_OF_ANSWERS from qpie_qa.user_answers ua, qpie_qa.questions q where ua.question_id=q.question_id and ua.user_id=?",req.params.id, (err,results)=> {
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

function getUserAnswerCnt(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    conn.query('select count(answer_id) posetd_answer_cnt from qpie_qa.user_answers where user_id=?',req.params.id, (err,results)=> {
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

function postQuestion(req,res){
    pool.getConnection((err,conn)=>{
        if(err) throw (err);
        console.log(`connected as id: ${conn.threadId}`);
    conn.query("insert into qpie_qa.question",req.params.id, (err,results)=> {
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
module.exports= {getUserQuestions,
                updateUser,
                getUserNameEmail,
                List_of_followers,
                List_of_following, 
                getUserQuestionCnt, 
                getUserAnswers,
                getUserAnswerCnt,
                get_followers_count,
                get_following_count};
