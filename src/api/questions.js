//Questions class definition.
const db1=require('./db_connections.js');
const db_handler=require('./db_utils.js');
const vf=require('./validationFunctions.js');
db_handler1=new db_handler(db1.pool_qa);
class question{
    constructor(user_id,question_id,description,create_date,question_modified_date,attribute_modified_date, search_count,posted_anonymous,input_mode,turnoff_question,changed_anonymous,attachment_urls,longitude,latitude,user_hashtags){
        this.user_id                 =user_id ;
        this.question_id             =question_id ;
        this.description             =description ;
        this.create_date             =create_date ;
        this.question_modified_date  =question_modified_date ;
        this.attribute_modified_date =attribute_modified_date;
        this.search_count            =search_count ;
        this.posted_anonymous        =posted_anonymous ;
        this.input_mode              =input_mode ;
        this.turnoff_question        =turnoff_question ;
        this.changed_anonymous       =changed_anonymous ;
        this.attachment_urls         =attachment_urls ;
        this.longitude               =longitude ;
        this.latitude                =latitude ;
        this.user_hashtags           =user_hashtags;
    }
    errors=[]
    
    postQuestion(req,res){
    ///Work in progress....
        this.user_id                 =req.params.id;
        this.longitude			     =req.body.longitude;
        this.latitude			     =req.body.latitude;
        this.description             =req.body.description ;
        this.posted_anonymous        =req.body.posted_anonymous ;
        this.input_mode              =req.body.input_mode ;
        this.attachment_urls         =req.body.attachment_urls ;
        this.user_hashtags           =req.body.user_hashtags;
        this.errors=[];
        vf.checkForNull("user_id",this.user_id,this.errors);
        vf.checkForNull("longitude",this.longitude,this.errors);
        vf.checkForNull("latitude",this.latitude,this.errors);
        vf.checkForNull("description",this.description,this.errors);
        vf.checkForNull("input_mode",this.input_mode,this.errors);
        
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{        
            db_handler1.postQuestion(this,res);
        }
    }
    getUserFeedsByLocation(req,res){
        this.user_id    =req.params.id;
        var perimeter   =req.params.perimeter;
        this.errors=[];
        vf.checkForNull("user_id",this.user_id,this.errors);
        if(this.errors.length>0){
            res.status(400).send({"message":this.errors});
        }else{ 
            db_handler1.getUserFeedsByLocation(this,perimeter,res);
        }
    }
    
    
}

module.exports= new question();

//app.get('/userfeeds/:id', db_qa.getUserFeeds);

//app.get('/userquestions/:id', db_qa.getUserQuestions);

//app.get('/userquestioncnt/:id', db_qa.getUserQuestionCnt);

//app.get('/useranswers/:id', db_qa.getUserAnswers);

//app.get('/useranswercnt/:id', db_qa.getUserAnswerCnt);

//app.post('/postquestion/:id', db_qa.postQuestion);

//app.post('/postanswer/:userid=?&questionid=?', db_qa.postAnswer);

//app.post('/postcomment/:userid=?&answerid=?', db_qa.postComment);
