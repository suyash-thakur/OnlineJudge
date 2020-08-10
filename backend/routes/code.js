const express = require("express");
const fetch = require("node-fetch");
const Question = require('../Models/Question');
const TestCase = require("../Models/TestCases");
var request = require("request");
const { response } = require("express");
const router = express.Router();
router.get("/languages", (req, res, next) => {
  fetch("https://judge0.p.rapidapi.com/languages", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "judge0.p.rapidapi.com",
      "x-rapidapi-key": "f82a79729dmshb9a395a4966fae0p1dc999jsneb3b8c2c710c"
    }
  }).then(response => response.json()).then((body) => {
    console.log(body);
    res.status(200).json({
      languages: body
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});
router.post("/submission", (req, res, next)=> {
  console.log(Number(req.body.id));

var options = {
  method: 'POST',
  url: 'https://judge0.p.rapidapi.com/submissions',
  headers: {
    'x-rapidapi-host': 'judge0.p.rapidapi.com',
    'x-rapidapi-key': 'f82a79729dmshb9a395a4966fae0p1dc999jsneb3b8c2c710c',
    'content-type': 'application/json',
    accept: 'application/json',
    useQueryString: true
  },
  body: {
    language_id: req.body.id,
    source_code: req.body.code,
    stdin: 'world'
  },
  json: true
};
var token;
request(options, function (error, response, body) {
	if (error) throw new Error(error);

  console.log(body);
  token = body;
  res.status(200).json({
    token: body
  });
});
});
router.post('/output', (req, res, next) => {
  console.log(req.body.token.token.token);
  var options = {
    method: 'GET',
    url: 'https://judge0.p.rapidapi.com/submissions/' + req.body.token.token.token,
    headers: {
      'x-rapidapi-host': 'judge0.p.rapidapi.com',
      'x-rapidapi-key': 'f82a79729dmshb9a395a4966fae0p1dc999jsneb3b8c2c710c',
      useQueryString: true
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);


    res.status(200).json({
      output: body
    });
  });
});
router.get('/status', (req, res, next) => {
  var options = {
    method: 'GET',
    url: 'https://judge0.p.rapidapi.com/statuses',
    headers: {
      'x-rapidapi-host': 'judge0.p.rapidapi.com',
      'x-rapidapi-key': 'f82a79729dmshb9a395a4966fae0p1dc999jsneb3b8c2c710c',
      useQueryString: true
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    res.status(201).json({
      body
    });
  });
});
router.post('/addQuestion', (req, res, next) => {
  console.log(req.body);
  const question = new Question({
    title: req.body.title,
    description: req.body.description
  });
  question.save().then( async function(result) {
     for(var i = 0; i < req.body.testcases.length; i++) {
      const testcase = new TestCase({
        description: req.body.testcases[i].description,
        input: req.body.testcases[i].stdin,
        output: req.body.testcases[i].expectedOutput,
        question: result._id
      });
       testcase.save().then(  async function(responce) {
         console.log(result._id);
         console.log(responce._id);
        await Question.findOneAndUpdate({_id: result._id}, {$push: {testcases: responce._id}});
         console.log('test Cases Added');
      });
    }
    res.status(201).json({
      message: 'API found'
    });
  });

});
router.get("/questions", (req, res, next) => {
  Question.find().populate('testcases').then(questions => {
    if(questions){
      res.status(201).json({
        questions: questions
      });
    } else {
      res.status(501).json({
       error: 'Error'
      });
    }

  })
});
router.get("/removeQuestion:id", (req, res, next) => {
  Question.findOneAndRemove({_id: req.params.id}).then(responce => {
    if(responce){
      res.status(201).json({
        responce: responce
      });
    } else {
      res.status(501).json({
        responce: 'Error'
      });
    }

  })
});
router.get('/problemPreview', (req, res, next)=> {
  Question.find().select('title').then(responce => {
    if(responce) {
      res.status(201).json({
        question: responce
      });
    } else {
      res.status(501).json({
        error: "Cannot Retrive"
      });
    }
  })
});
router.get("/question:id", (req, res, next) => {
  Question.find({_id: req.params.id}).populate('testcases').then(responce => {
    if (responce) {
      res.status(201).json({
        question: responce
      });
    } else {
      res.status(501).json({
        error: "couldn't get blog"
      });
    }
  });
});
module.exports = router;
