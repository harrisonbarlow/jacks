const mongoose = require('mongoose');
const { Schema } = mongoose;

const data = new Schema({
	depth: Number,
	dip: Number,
	azimuth: Number
});

module.exports = data;