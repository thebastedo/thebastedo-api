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
app.listen(settings.listenHost, settings.listenPort);
