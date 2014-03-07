var mongo = require('mongodb');
		sec = require('../lib/apisec');

var Server = mongo.Server,
		Db = mongo.Db,
		BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('thebastedo', server);

db.open(function(err,db){
	if (!err) {
		console.log("Connected to 'thebastedo' db");
		db.collection('thebastedo', {strict:true}, function(err,collection){
			if (err){
				console.log("thebastedo collection doesn't exist, creating it.");
				populateDB();
			}
		});
	}
});

exports.getAll = function(req,res) {
	console.log("Get All req.ip = " + req.ip);
	db.collection('thebastedo', function(err,collection){
		collection.find().toArray(function(err,items){
			res.send(items);
		});
	});
};

exports.findById = function(req,res) {
	var id = req.params.id;
	console.log('retrieving update: ' + id);
	db.collection('thebastedo',function(err,collection){
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err,item){
			res.send(item);
		});
	});
};

exports.addUpdate = function(req,res) {
	sec.hasAccess(req.ip, function(response){
		if (!response) {
			console.log("Add Failed...IP " + req.ip + " does not have access.");
			res.send({'error':'what was that'});
		} else {
			var update = req.body;
			console.log('Adding Update: ' + JSON.stringify(update));
			db.collection('thebastedo', function(err,collection) {
				collection.insert(update, {safe:true}, function(err,result) {
					if (err) {
						res.send({'error':'insert failed'});
					} else {
						console.log('Success: ' + JSON.stringify(result[0]));
						res.send(result[0]);
					}
				});
			});
		}
	});
};

exports.updateUpdate = function(req,res) {
	sec.hasAccess(req.ip,function(response) {
		if (!response) {
			console.log("Update Failed...IP " + req.ip + " does not have access.");
			res.send({'error':'what was that'});
		} else {
			var id = req.params.id;
			var update = req.body;
			console.log('updating update: ' + id);
			console.log(JSON.stringify(update));
			db.collection('thebastedo', function(err,collection) {
				collection.update({'_id': new BSON.ObjectID(id)}, update, {safe:true}, function(err,result) {
					if (err) {
						console.log('Error updating update: ' + err);
						res.send({'error': 'update failed'});
					} else {
						console.log('' + result + ' update saved');
						res.send(update);
					}
				});
			});
		}
	});
};

exports.deleteUpdate = function(req,res) {
	sec.hasAccess(req.ip,function(response) {
		if (!response) {
			console.log("Delete Failed...IP " + req.ip + " does not have access.");
			res.send({'error':'what was that'});
		} else {
			var id = req.params.id;
			console.log('Deleting update: ' + id);
			db.collection('thebastedo', function(err,collection) {
				collection.remove({'_id': new BSON.ObjectID(id)}, {safe:true}, function(err,result) {
					if (err) {
						console.log('Error deleting update: ' + err);
						res.send({'error':'delete failed'});
					} else {
						console.log('' + result + ' document deleted');
						res.send(req.body);
					}
				});
			});
		}
	});
};

// populate method
var populateDB = function() {

	var updates = [
	{
		"date": "2-13-2014",
		"title": "Day 1",
		"body": "So today I started my initial dive into HTML5 and CSS. Spent the day reading up on some basics and building a general static html site. Played with all the basics; video, audio, etc all of which can be found in the tests area."
	},
	{
		"date": "2-14-2014",
		"title": "Day 2",
		"body": "Now diving more into how I want to structure this. After some talks chose to try out AngularJS. Mainly spent the day going through their getting started tutorial. Still need to spend some time to grok all the test writing."
	},
	{
		"date": "2-15-2014",
		"title": "Day 3",
		"body": "Diving into building more of my own site out with AngularJS. Struggling with design as always because I am not good there. Have the basic skeleton built out. Moving the static content into views and route paths. Looked into nested routing but added more complexity than I wanted right now, will probably refactor that later. Setting up my first service, but still using static json file."
	}];

	db.collection('thebastedo', function(err,collection) {
		collection.insert(updates, {safe:true}, function(err,result) {});
	});
};
