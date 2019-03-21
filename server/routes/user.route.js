var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/database');
var secret = config.secret;
var User = require('../models/user');


router.post('/signup', function (req, res, next) {
    var user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10), //10 jest argumentem ozn na ile mocne jest szyfrowanie
        email: req.body.email
    });
    user.save((err, result) => {
        if (err) {
            if (err.name="ValidationError") {
                if (Object.keys(err.errors)[0] == 'username') {
                    res.send('username')
                    console.log(Object.keys(err.errors)[0])
                }
                else if (Object.keys(err.errors)[0] == 'email') {
                    res.send('email')
                    console.log(Object.keys(err.errors)[0])
                }
                else {
                    res.sendStatus(422)
                    console.log('422', err.errors)
                }
                // res.status(422).send(valErrors)
                
            }
            else {
                res.send(err)
            }
        }
        else {
            res.send(result);
        }

    });
});

router.post('/login', function(req, res) {
    // const body = req.body;
  
    // const user = User.find(user => user.email == body.email);
    // const user = User.findOne(user => user.email == body.email);
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            return  res.sendStatus(401)
        }
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.sendStatus(401);
        }
    // if(!user || body.password != 'todo') return res.sendStatus(401);
        else {
            // let token = jwt.sign({userID: user.id}, secret, {expiresIn: '24h'});
            let token = jwt.sign({user: user}, secret, {});
            let userr = user;
            // console.log(userr)
            res.send({token, userr});
        }

    });
    
  });





module.exports = router;