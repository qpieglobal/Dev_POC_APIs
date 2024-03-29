//classes for tables...
const db1=require('./db_connections.js');
const db_handler=require('./db_utils.js');
db_handler1=new db_handler(db1.pool_user);
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
    validateUserData_userid(){
        if (!this.user_id){
            console.log("User ID is null");
            this.errors.push("User Id is null");
        }
    }
    validateUserData_dob(){
        if (!this.dob){
            console.log("Date of birth is null");
            this.errors.push("Date of birth is null");
        }
    }
    validateUserData_mobile(){
        const mobile_regexp1= new RegExp('^[0-9]{10}$');
        const mobile_regexp2= new RegExp('^([+])([0-9]{1,2})([0-9]{10})$');
        const mobile_regexp3= new RegExp('^([+])([0-9]{1,2})([ ]{0,1}[(][0-9]{3}[)][- ][0-9]{3}[ ][0-9]{4})$');
        const mobile_regexp4= new RegExp('^([(][0-9]{3}[)][- ][0-9]{3}[ ][0-9]{4})$');
        const mobile_regexp5= new RegExp('^([0-9]{3}[- ][0-9]{3}[- ][0-9]{4})$');
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
    }
    validateUserData_email(){
        const email_regexp1= new RegExp('^([0-9a-zA-z]{1})([0-9a-zA-z]{0,})([.]{1})([0-9a-zA-z]{1,})([@]{1})([a-zA-z]{1,})([.])([a-zA-z]{1,})$');
        const email_regexp2= new RegExp('^([0-9a-zA-z]{1})([0-9a-zA-z]{0,})([@]{1})([a-zA-z]{1,})([.])([a-zA-z]{1,})$');
        if (!this.email_id) {
            console.log("Email id is null");
            this.errors.push("Email id is null");
        }else if(!email_regexp1.test(this.email_id) &&
                 !email_regexp2.test(this.email_id)
                 ){
            console.log("Email id is not valid");
            this.errors.push("Email id is not valid");
            
        }
    }
    validateUserData_first_name(){
        if (!this.first_name){
            console.log("First name is null");
            this.errors.push("First name is null");
        }
    }
    validateUserData_last_name(){
        if (!this.last_name){
            console.log("Last name is null");
            this.errors.push("Last name is null");
        }
    }
    validateUserData_profile_picture(){
        if (!this.profile_picture){
            console.log("Profile picture is null");
            this.errors.push("Profile picture is null");
        }
    }
    createUser(req,res){
        this.user_id=req.body.user_id;
        this.mobile_number=req.body.mobile_number;
        this.errors=[];
        this.validateUserData_mobile();
        this.validateUserData_userid();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
        
        db_handler1.createUser(this,res);
        //res.send(result1);
        }
    }
    getAllUsers(req,res){
        db_handler1.getAllUsers(req,res);
    }
    updateUser(req,res){
        this.user_id            =req.params.id;
        this.email_id           =req.body.email_id;
        this.first_name         =req.body.first_name;
        this.last_name          =req.body.last_name;
        this.last_modified_date	=req.body.last_modified_date;
        this.status				=req.body.status;
        this.profile_picture	=req.body.profile_picture;
        this.current_location	=req.body.current_location;
        this.description		=req.body.description;
        this.dob				=req.body.dob;
        this.occupation			=req.body.occupation;
        this.PP_Accepted		=req.body.PP_Accepted;
        this.PP_Accepted_date	=req.body.PP_Accepted_date;
        this.PP_Accepted_Page	=req.body.PP_Accepted_Page;
        this.errors=[];
        this.validateUserData_userid();
        var key_list=Object.keys(req.body);
        if(key_list.includes('email_id')){
            this.validateUserData_email();
        }
        if(key_list.includes('dob')){
            this.validateUserData_dob();
        }
        if(key_list.includes('first_name')){
            this.validateUserData_first_name();
        }
        if(key_list.includes('last_name')){
            this.validateUserData_last_name();
        }
        if(key_list.includes('profile_picture')){
            this.validateUserData_profile_picture();
        }
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.updateUser(this,key_list,res);
        }
    };
    getUserProfileDetails(req,res){
        this.user_id            =req.params.id;
        this.errors=[];
        this.validateUserData_userid();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.getUserProfileDetails(this,res);
        }
    };
    getUserImage(req,res){
        this.user_id            =req.params.id;
        this.errors=[];
        this.validateUserData_userid();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.getUserImage(this,res);
        }
    };
    getFollowersCount(req,res){
        this.user_id            =req.params.id;
        this.errors=[];
        this.validateUserData_userid();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.getFollowersCount(this,res);
        }
    };
    getFollowingCount(req,res){
        this.user_id            =req.params.id;
        this.errors=[];
        this.validateUserData_userid();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.getFollowingCount(this,res);
        }
    };
    listOfFollowers(req,res){
        this.user_id            =req.params.id;
        this.errors=[];
        this.validateUserData_userid();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.listOfFollowers(this,res);
        }
    };
    listOfFollowing(req,res){
        this.user_id            =req.params.id;
        this.errors=[];
        this.validateUserData_userid();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.listOfFollowing(this,res);
        }
    };
    getUserNameEmail(req,res){
        this.user_id            =req.params.id;
        this.errors=[];
        this.validateUserData_userid();
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.getUserNameEmail(this,res);
        }
    };
}
//uo=
module.exports= new user();