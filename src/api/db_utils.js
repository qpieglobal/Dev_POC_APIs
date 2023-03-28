//DB handler object and methods for database operations.
//only class name should be exported not the class object. 
//Need to create an instance of the db_handler and pass the connectionpool object in the calling script.
//all the methods uses the pool objects to make connection to the DB and schema to execute the called method.
class db_handler{
    constructor(pool){
        this.pool=pool;
    }

    createUser(user_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        const vals=[user_obj.user_id,user_obj.mobile_number];
        conn.query('insert into qpie_user.user(user_id,mobile_number) values(?,?)',vals, (err,results)=> {
            conn.release();
            if(!err){
                res.send( {"message":`user record ${user_obj.user_id} has been created`});
            }else{
                console.log(`error while creating user: ${err}`);
                throw err;
            }
            });
        });
    };
    getAllUsers(req,res){
        this.pool.getConnection((err,conn)=>{
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
    updateUser(user_obj,keys_list,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        var sql="update qpie_user.user set ";
        var i=1
        var vals=[]
        for (var k in keys_list) {
            if(Object.keys(user_obj).includes(keys_list[k])){
                if (i < keys_list.length){
                    sql += `${keys_list[k]}=?,`;
                }else{
                    sql += `${keys_list[k]}=?`;
                }
                vals.push(user_obj[keys_list[k]]); 
            }
            i++;       
        };
        vals.push(user_obj.user_id);
        sql+=`,last_modified_date=UTC_TIMESTAMP where user_id=?`
        conn.query(sql,vals, (err,results)=> {
            conn.release();
            if(!err){
                res.send( {"message":`user record ${user_obj.user_id} has been updated`});
            }else{
                console.log(`error while updating user data: ${err}`);
                throw err;
            }
            });
        });
    };
    getUserProfileDetails(user_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
            
        conn.query('select * from qpie_user.user where user_id=?',user_obj.user_id, (err,results)=> {
            conn.release();
            if(!err){
                res.send(results);
            }else{
                console.log(`error while fetching user-${user_obj.user_id}: ${err}`);
                throw err;
            }
            });
        });
    };
    
    getUserImage(user_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        conn.query('select profile_picture from qpie_user.user where user_id=?',user_obj.user_id, (err,results)=> {
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
    
    getFollowersCount(user_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        conn.query("select count(user_id) as followers_count qpie_user.user_following where follow_status='Y' and following_user=?",user_obj.user_id, (err,results)=> {
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
    
    getFollowingCount(user_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        conn.query("select count(following_user) as following_count qpie_user.user_following where follow_status='Y' and user_id=?",user_obj.user_id, (err,results)=> {
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
    
    listOfFollowers(user_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        conn.query("select user_id,first_name,last_name from qpie_user.user where user_id in (select user_id qpie_user.user_following where follow_status='Y' and following_user=?)",user_obj.user_id, (err,results)=> {
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
    
    listOfFollowing(user_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        conn.query("select user_id,first_name,last_name from qpie_user.user where user_id in (select following_user qpie_user.user_following where follow_status='Y' and user_id=?)",user_obj.user_id, (err,results)=> {
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
    
    getUserNameEmail(user_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        conn.query("select user_id,first_name,last_name,email_id from qpie_user.user where user_id=?",user_obj.user_id, (err,results)=> {
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

    updateCurrentLocation(lt_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        const vals=[lt_obj.user_id,lt_obj.longitude,lt_obj.latitude,lt_obj.longitude,lt_obj.latitude];
        conn.query(`insert into qpie_qa.location_tracking(user_id,longitude,latitude) values(?,?,?)
                    on duplicate key update
                    longitude=?,
                    latitude=?,
                    TRACKING_DATE=UTC_TIMESTAMP()`,vals, (err,results)=> {
            conn.release();
            if(!err){
                res.send( {"message":`current location of user ${lt_obj.user_id} has been recorded`});
            }else{
                console.log(`error while recording user location: ${err}`);
                throw err;
            }
            });
        });
    };
    getAllNearestUsersInPerimeter(lt_obj,perimeter,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        conn.query(`SELECT p3.current_usr,p2.user_id as near_by_user,p3.point1,
                          (3959 *
                            acos(cos(radians(p3.latitude)) * 
                            cos(radians(p2.latitude)) * 
                            cos(radians(p2.longitude) - 
                            radians(p3.longitude)) + 
                            sin(radians(p3.latitude)) * 
                            sin(radians(p2.latitude )))
                          ) AS distance
                              from qpie_qa.location_tracking p2 
                              join  (select  p1.user_id current_usr,p1.longitude,p1.latitude 
                                        from qpie_qa.location_tracking p1 where p1.user_id=?) p3
                            HAVING distance<=?`,
                    [lt_obj.user_id,perimeter], (err,results)=> {
            conn.release();
            if(!err){
                res.send(results);
            }else{
                console.log(`error while fetching nearest users in the perimeter of ${perimeter} meters: ${err}`);
                throw err;
            }
            });
        });
    };
    postQuestion(qa_obj,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        var question_id
        conn.query(`select concat('q',(UTC_TIMESTAMP()+0),substr(reverse(rand()),1,6)) as qid`,(err1,results1)=> {
            if(!err1){
                question_id=results1[0].qid;
                console.log(`new question_id:${question_id}`);
            }else{
                console.log(`error while generating new questionid: ${err}`);
                conn.release();
                throw err1;
            }
            
        const vals=[question_id,qa_obj.user_id,qa_obj.longitude,qa_obj.latitude,qa_obj.description,qa_obj.posted_anonymous,qa_obj.input_mode,qa_obj.attachment_urls,qa_obj.user_hashtags];
        console.log(vals);
        conn.query(`insert into qpie_qa.questions(question_id,
                                                  user_id,
                                                  longitude,
                                                  latitude,
                                                  description,
                                                  posted_anonymous,
                                                  input_mode,
                                                  attachment_urls,
                                                  user_hashtags) 
                                          values(?,?,?,?,?,?,?,?,?)`,
                                          vals, (err,results)=> {
            conn.release();
            if(!err){
                res.send( {"message":"Question posted successfully","question_id":question_id});
            }else{
                console.log(`error while creating user: ${err}`);
                throw err;
            }
            });
        });});
    };
    getUserFeedsByLocation(qa_obj,perimeter,res){
        this.pool.getConnection((err,conn)=>{
            if(err) throw (err);
            console.log(`connected as id: ${conn.threadId}`);
        //This query finds the nearest users within given perimeter and fethes all questions posted by the nearest users
        conn.query(`SELECT p2.*
                      from qpie_qa.questions p2 
                      join  (select  p1.user_id current_usr,p1.longitude,p1.latitude 
                               from qpie_qa.location_tracking p1 where p1.user_id=?) p3
                      WHERE (3959 *
                            acos(cos(radians(p3.latitude)) * 
                            cos(radians(p2.latitude)) * 
                            cos(radians(p2.longitude) - 
                            radians(p3.longitude)) + 
                            sin(radians(p3.latitude)) * 
                            sin(radians(p2.latitude )))
                            )<=?`,
                       [qa_obj.user_id,perimeter], (err,results)=> {
            conn.release();
            if(!err){
                res.send(results);
            }else{
                console.log(`error while fetching user feeds by location: ${err}`);
                throw err;
            }
            });
        });
    };
};
//only class name should be exported not the class object. 
module.exports= db_handler;