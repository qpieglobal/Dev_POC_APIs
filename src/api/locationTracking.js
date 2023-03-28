//Location tracking methods.
const db1=require('./db_connections.js');
const db_handler=require('./db_utils.js');
const vf=require('./validationFunctions.js');
db_handler1=new db_handler(db1.pool_qa);
class locationTracking{
    constructor(user_id,longitude,latitude,tracking_date){
        this.user_id			=user_id;
        this.longitude			=longitude;
        this.latitude			=latitude;
        this.tracking_date      =tracking_date;
    }
    errors=[]
   // validateUserId(){
   //     if (!this.user_id){
   //         console.log("User ID is null");
   //         this.errors.push("User Id is null");
   //     }
   // }
   // validateLongitude(){
   //     if (!this.longitude){
   //         console.log("Longitude is null");
   //         this.errors.push("Longitude is null");
   //     }
   // }
   // validateLatitude(){
   //     if (!this.latitude) {
   //         console.log("Latitude is null");
   //         this.errors.push("Latitude is null");
   //     }
   // }
    updateCurrentLocation(req,res){
        this.user_id            =req.params.id;
        this.longitude			=req.body.longitude;
        this.latitude			=req.body.latitude;
        this.errors=[];
        vf.checkForNull("user_id",this.user_id,this.errors);         
        vf.checkForNull("longitude",this.longitude,this.errors);
        vf.checkForNull("latitude",this.latitude,this.errors);
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
        
        db_handler1.updateCurrentLocation(this,res);
        //res.send(result1);
        }
    }
    getAllNearestUsersInPerimeter(req,res){
        this.user_id            =req.params.id;
        var perimeter               =req.params.perimeter;
        this.errors=[];
        vf.checkForNull("user_id",this.user_id,this.errors);         
        vf.checkForNull("perimeter",perimeter,this.errors);
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{
            db_handler1.getAllNearestUsersInPerimeter(this,perimeter,res);
        }
    }
    
    
}
//lt=new locationTracking();
module.exports= new locationTracking();