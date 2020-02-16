const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/DrillHole');

mongoose.connect(keys.mongoURI);

const app = express();

const DrillHoles = mongoose.model('drillholes');

app.get('/api/drillholes', (req, res) => {
	DrillHoles.find({}, function(err, drillholes) {
    res.send(drillholes);  
  });
});

app.get('/api/drillholes/:id', (req, res) => {
	DrillHoles.find({ id: req.params.id }, function(err, data) {
    res.send(data);  
  });
});

if(process.env.NODE_ENV == 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);