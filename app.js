// This application uses express as its web server
// for more info, see: http://expressjs.com
var compression = require('compression');
var express = require('express');
var path = require('path');
var cfenv = require('cfenv');

//cache control for static files
var oneDay = 86400000;

// create a new express server
var app = express();
app.use(compression())



app.use(function(req, res, next) {
  //dont use https if development
  if ( app.get('env') === 'development' ) {
      next();
  }
  else if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
     next();
  }
});

app.use('/js', express.static(__dirname + '/build/assets/js', { maxAge: oneDay }));
app.use('/css', express.static(__dirname + '/build/assets/css', { maxAge: oneDay }));
app.use('/fonts', express.static(__dirname + '/build/assets/fonts', { maxAge: oneDay }));
app.use('/img', express.static(__dirname + '/build/assets/img', { maxAge: oneDay }));
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/build/', { maxAge: oneDay }));

// https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
app.get('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('build/index.html', { root: __dirname });
});

//health checker
/* 
app.get('/health', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.send(200);
});
*/ 


var appEnv = cfenv.getAppEnv();
console.log(JSON.stringify(appEnv)); 
app.listen(appEnv.port, appEnv.bind, function() {
    console.log("server starting on " + appEnv.port);
});


// start server on the specified port and binding host (8081 is what EB expects) 
/* 
app.listen(8081, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " );
});
*/ 
