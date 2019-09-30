const mongoose = require('mongoose');

const { Schema } = mongoose;

const MapsSchema = new Schema({
  point: [],
  name: String,
  style: String,
});

mongoose.model('Maps', MapsSchema);