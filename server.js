/*
 * Handle our requires
 */
var express = require('express');
		updates = require('./routes/updates');

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

app.listen(3000);
console.log('listening on port 3000...');
