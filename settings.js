exports.listenHost = process.env.OPENSHIFT_NODEJS_IP;
exports.listenPort = parseInt(process.env.OPENSHIFT_NODEJS_PORT);

exports.mongoHost = process.env.OPENSHIFT_MONGODB_DB_HOST;
exports.mongoPort = parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT);
exports.mongoDb = 'thebastedo';

exports.dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
exports.dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
