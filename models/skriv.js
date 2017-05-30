// Calling Population function
var populatePosts = require('./../population/mongoPop').populatePosts;

// Create a new mongoose schema damages
var Schema = m.mongoose.Schema({
  artikel: {
    type: m.mongoose.Schema.Types.ObjectId,
    ref: 'artikel',
    required: true
  },
  medlem: {
    type: m.mongoose.Schema.Types.ObjectId,
    ref: 'medlem',
    required: true
  }
});

Schema.post('find', function(docs, next) {
  populatePosts(docs, 'artikel medlem', next);
});

Schema.post('findOne', function(docs, next) {
  populatePosts(docs, 'artikel medlem', next);
});

module.exports = m.mongoose.model("skriv", Schema);