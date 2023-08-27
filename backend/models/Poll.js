const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
  usr_id: { 
    type: String, 
    required: true 
  },
  poll_id: { 
    type: String, 
    required: true 
  },
  option_one: { 
    type: String, 
    required: true 
  },
  option_two: { 
    type: String, 
    required: true 
  },
  option_one_votes: { 
    type: Number, 
    default: 0 
  },
  option_two_votes: { 
    type: Number, 
    default: 0 
  },
  num: {
    type: Number,
    unique: true,
    index: true,
    required: true,
    default: 0
  }
});

pollSchema.pre('save', async function(next){
  if(!this.isNew) return next()
  try {
    const latestPoll = await Poll.findOne({}, 'num').sort({num: -1}).exec()
    this.num = latestPoll ? latestPoll.num + 1 : 1
    next()
  } catch (error) {
    console.log('poll model error');
    return next(error)
  }
})

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;