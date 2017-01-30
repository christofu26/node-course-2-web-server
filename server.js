var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/* Middleware functions */
// This keep tracks of how the website is being used
app.use(function(request, response, next) {
  var now = new Date().toString();
  var log = now + ':' + request.method + request.url;

  console.log(log);
  fs.appendFile('server.log', log + '\n', function(error) {
    if (error) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// // Because this middleware function does not have next(), nothing else will be accessible after the following set of code
// app.use(function(request, response, next) {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// Help functions
hbs.registerHelper('getCurrentYear', function() {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
  return text.toUpperCase();
});

app.get('/', function(request, response) {
  response.render('home.hbs', {
    welcomeMessage: 'Welcome to my website',
    pageTitle: 'Home Page',
  });
});

app.get('/about', function(request, response) {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', function(request, response) {
  response.send({
    errorMessage: 'Unable to fulfill this request'
  });
});

app.listen(3000, function() {
  console.log('Server is up on port 3000');
});
