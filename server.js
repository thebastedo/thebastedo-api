//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

/*
 * Handle our requires
 */
var express = require('express');
		updates = require('./routes/updates');
		settings = require('./settings');

/*
 * Creating our main app
 */
var app = express();

// Configure it
app.configure(function() {
	app.use(express.logger('dev'));
	//app.use(express.logger('tiny'));
	app.use(express.bodyParser());
	//app.use(allowCrossDomain);
	app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
	});
});

/*
 * Our Update Routes
 */
app.get('/updates', updates.getAll);
app.get('/updates/:id', updates.findById);
app.post('/updates', updates.addUpdate);
app.put('/updates/:id', updates.updateUpdate);
app.delete('/updates/:id', updates.deleteUpdate);

//app.listen('nodejs-thebastedo.rhcloud.com',80);
//console.log('listening on port 15080...');
console.log('listening on ' + settings.listenHost + ':' + settings.listenPort);
app.listen(settings.listenPort, settings.listenHost);
