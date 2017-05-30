// Calling Population function
var populatePosts = require('./../population/mongoPop').populatePosts;

// Create a new mongoose schema damages
var Schema = m.mongoose.Schema({
  bildtext: {
    type: String,
    required: true
  },
  artikel: {
    type: m.mongoose.Schema.Types.ObjectId,
    ref: 'artikel',
    required: true
  },
  bild: {
    type: m.mongoose.Schema.Types.ObjectId,
    ref: 'bild',
    required: true
  }
});

Schema.post('find', function(docs, next) {
  populatePosts(docs, 'artikel bild', next);
});

Schema.post('findOne', function(docs, next) {
  populatePosts(docs, 'artikel bild', next);
});

module.exports = m.mongoose.model("har", Schema);

