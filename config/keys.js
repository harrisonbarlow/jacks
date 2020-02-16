//keys.js - figure out which set to use
if(process.env.NODE_ENV == 'production') {
	module.exports = require('./prod');
} else {
	module.exports = require('./dev');
}