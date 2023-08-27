const mongoose = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema({
  usr_id: { type: String, required: true },
  poll_id: { type: String, required: true },
  isOptionOne: { type: Boolean, required: true },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote