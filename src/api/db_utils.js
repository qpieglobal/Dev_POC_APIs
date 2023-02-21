//classes for tables...
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
        //console.log(keys_list)
        //console.log(Object.keys(user_obj))
        for (var k in keys_list) {
            //console.log(keys_list[k]);
            //if(Object.keys(user_obj).includes(keys_list[k])){
            //    console.log(`field ${keys_list[k]} exists`);
            //}else{
            //    console.log(`field ${keys_list[k]} does not exists`);
            //}
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
};

module.exports= db_handler;