//classes for tables...
const db1=require('./db.js');
class db_handler{
    constructor(pool){
        this.pool=pool;
    }

    createUser3(req,res){
        this.pool.getConnection((err,conn)=>{
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
};
db_handler1=new db_handler(db1.pool);
class user{
    constructor(user_id, first_name, last_name, mobile_number, email_id, create_date, last_modified_date, status, profile_picture, current_location, description, dob, occupation, PP_Accepted, PP_Accepted_date, PP_Accepted_Page){
        this.user_id			=user_id;
        this.first_name			=first_name;
        this.last_name			=last_name;
        this.mobile_number		=mobile_number;
        this.email_id			=email_id;
        this.create_date		=create_date;
        this.last_modified_date	=last_modified_date;
        this.status				=status;
        this.profile_picture	=profile_picture;
        this.current_location	=current_location;
        this.description		=description;
        this.dob				=dob;
        this.occupation			=occupation;
        this.PP_Accepted		=PP_Accepted;
        this.PP_Accepted_date	=PP_Accepted_date;
        this.PP_Accepted_Page	=PP_Accepted_Page;
    }
    errors=[]
    validateUserData_create(){
        const mobile_regexp1= new RegExp('^[0-9]{10}$');
        const mobile_regexp2= new RegExp('^([+])([0-9]{1,2})([0-9]{10})$');
        const mobile_regexp3= new RegExp('^([+])([0-9]{1,2})([ ]{0,1}[(][0-9]{3}[)][- ][0-9]{3}[ ][0-9]{4})$');
        const mobile_regexp4= new RegExp('^([(][0-9]{3}[)][- ][0-9]{3}[ ][0-9]{4})$');
        const mobile_regexp5= new RegExp('^([0-9]{3}[- ][0-9]{3}[- ][0-9]{4})$');
        //errors=[]
        if (!this.user_id){
            console.log("User ID is null");
            this.errors.push("User Id is null");
        }
        if (!this.mobile_number) {
            console.log("Mobile Number is null");
            this.errors.push("Mobile Number is null");
        }else if(!mobile_regexp1.test(this.mobile_number) &&
                 !mobile_regexp2.test(this.mobile_number) &&
                 !mobile_regexp3.test(this.mobile_number) &&
                 !mobile_regexp4.test(this.mobile_number) &&
                 !mobile_regexp5.test(this.mobile_number) ){
            console.log("Mobile Number is not valid");
            this.errors.push("Mobile Number is not valid");
            
        }
        //return errors;
    }
    createUser(req,res){
        this.user_id=req.body.user_id;
        this.mobile_number=req.body.mobile_number;
        this.errors=[];
        this.validateUserData_create();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
        
        db_handler1.createUser3(req,res);
        //res.send(result1);
        }
    }
    
}

module.exports= user;