const express = require('express');
const app=express();
const port=process.env.API_PORT||3000;
const db_qa=require('./db_qa.js');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/userfeeds/:id', db_qa.getUserFeeds);

app.get('/userquestions/:id', db_qa.getUserQuestions);

app.get('/userquestioncnt/:id', db_qa.getUserQuestionCnt);

app.get('/useranswers/:id', db_qa.getUserAnswers);

app.get('/useranswercnt/:id', db_qa.getUserAnswerCnt);

app.post('/postquestion/:id', db_qa.postQuestion);

app.post('/postanswer/:userid=?&questionid=?', db_qa.postAnswer);

app.post('/postcomment/:userid=?&answerid=?', db_qa.postComment);

app.listen(port,()=>{console.log(`listening at http://localhost:${port}/`)});
