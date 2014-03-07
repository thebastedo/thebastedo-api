var dns = require('dns');

exports.hasAccess = function(ip, callback) {
	dns.resolve4('thebastedo.dyndns.org', function(err,address) {
		if (err) throw err;
		//console.log('addresses: ' + JSON.stringify(address) + ' IP: ' + ip);
		//console.log(ip == '127.0.0.1');
		if (ip == address || ip == "127.0.0.1") {
			console.log('APISEC - cleared');
			callback(true);
		}
		else {
			console.log('APISEC - failed');
			callback(false);
		}
	});
};
