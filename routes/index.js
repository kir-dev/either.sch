var _ = require('../public/assets/js/lodash.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/question', function (req, res, next) {
  dal.Answer.find({ user: req.user }, function (err, doc) {
    var asked = _.map(doc, 'question');
    console.log(asked[0]);
    dal.Question.find({ _id: { $nin: asked } }, function (err, doc) {
        res.json(_.sample(doc));
    });
  })
});

router.post('/answer', function (req, res) {
   new dal.Answer({question: req.body.question, answer: req.body.answer, timestamp: new Date(), user: req.user}).save(function (err, doc) {
       dal.Answer.find({ question: doc.question }, function (err, doc) {
           var ans1 = _.filter(doc, (ans) => ans.answer === 1).length;
           var ans2 = _.filter(doc, (ans) => ans.answer === 2).length;
           if(req.body.answer == 1) {
             ans1 -= 1;
           } else {
            ans2 -= 1;
           }

           var ret = 0;
           if(ans1 == 0 && ans2 == 0) {
             ret = -1;
           } else if(ans2 == 0) {
             ret = 1;
           } else {
             ret = ans1 / (ans1 + ans2);
           }
           res.json({percent: ret});
       });
   })
});



router.get('/questions/new', function (req, res, next) {

    res.render('new_question');

});

module.exports = router;


router.post('/questions/new', function (req, res, next) {

    var question = {
        question: req.body.question,
        answer1: req.body.answer1,
        answer2: req.body.answer2
    };

    dal.Question.findOne(question, function(err, doc){

        if(doc) {
            res.render('new_question', {
                "message": {
                    "message": "Bocs ostya, ilyen már van",
                    "type": "error"
                }
            });
            return;
        } else {
            new dal.Question(question).save(function (err) {
                if (err) {
                    res.render('new_question', {
                            "message": {
                                "message": "Valami hiba történt, bocs inas",
                                "type": "error"
                            }
                        }
                    );
                } else {

                    res.render('new_question', {
                            "message": {
                                "message": "Szép volt bástya, létrehoztál egy új kérdést",
                                "type": "success"
                            }
                        }
                    );
                }
            });
        }

    });

});
