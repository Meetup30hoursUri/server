var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDdYNdOtAHXixnYBn10fjg9S2IcDW-iLZk",
    authDomain: "AUTHDOMAIN",
    databaseURL: "https://hours-pjt.firebaseio.com/",
    projectId: "hours-pjt",
    storageBucket: "PROJECTBUCKET"
    // messagingSenderId: "ID"
};
firebase.initializeApp(config);

var ref = firebase.database().ref('/users');

var messages = [{test: 'some text', owner: 'Tim'}, {test: 'other message', owner: 'Jane'}];
var users = [];

app.use(bodyparser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})

var api = express.Router();
var auth = express.Router();

api.get('/messages', (req, res) => {
    res.json(messages);
})

api.post('/message', (req, res) => {
    messages.push(req.body);
res.sendStatus(200);
})

auth.post('/register', (req, res) => {
var index = users.push(req.body) - 1;
var index = users.push(req.body) - 1;
var user = users[index];
user.id = index;
    const userConst = user;
    const email = user.email;
sendToken(user, res);
ref.push({user: userToSave}).then((snapshot) => {
   })
})

auth.post('/login', (req, res) => {
var userExists = false;
    ref.orderByChild('user/email').equalTo(req.body.email).on("value", function (snapshot) {
      
        var userDB;
        snapshot.forEach(function (data) {
            userExists = true;
            userDB = data.val().user;
            userDB = data.val().user;
        })

        if (!userExists) {
            console.log("login error no user")
            return
            sendAuthError(res);
        }

        if (userDB.password == req.body.password)
            sendToken(userDB, res);

        else sendAuthError(res);
    });
})

function sendAuthError(res) {
    return res.json({success: false, message: 'email or password incorrect'});
}

function sendToken(user, res) {
    var token = jwt.sign(user.id, '123');
    res.json({firstName: user.firstName, role:user.role, token});
}


app.use('/api', api);
app.use('/auth', auth);

app.listen(1234);