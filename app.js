var firebase = require("firebase");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');


//include routes to views
console.log("Setting up routes...");
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var home = require('./routes/home');
var joinProject = require('./routes/joinProject');
var createProject = require('./routes/createProject');


//make public folder public

console.log("Starting view engine...");
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', index);
app.use('/users', users);
app.use('/signup', signup);
app.use('/login', login);
app.use('/createProject', createProject);
app.use('/joinProject', joinProject);

//retrieve homepage login/signup button links  
console.log("Getting routes... ");
app.get('/login', login);
app.get('/signup', signup);
app.get('/home', home);
app.get('/createProject', createProject);
app.get('/joinProject', joinProject);

// may not be necessary
// app.get('/joinProject', joinProject);
// app.get('/createProject', createProject);

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});
 
// handling 404 errors
app.use(function(err, req, res, next) {
  if (err.status !== 404) {
    return next();
  }
  res.send(err.message || '404 Page Not Found');
});


//displays port being used 
http.listen(process.env.PORT, function() {
  console.log(process.env.IP + ":" + process.env.PORT);
});


io.on('connection', function(socket) {
  // io.emit({'msg': 'test'})
  console.log("Socket.io test");
  // console.log('a user connected');
  // socket.on('chat message', function(msg) {
  //   io.emit('chat message', msg);
  // });
});  