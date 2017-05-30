// Calling Population function
var populatePosts = require('./../population/mongoPop').populatePosts;

// Create a new mongoose schema
var Schema = m.mongoose.Schema({
  Id_Kommentar: {
    type: String,
    required: true
  },
  anvendarnamn: {
    type: String,
    required: true
  },
  text_kommentar: {
    type: String,
    required: true
  },
  datum_kommentar: {
    type: Date,
    required: true
  },
  artikel: {
    type: m.mongoose.Schema.Types.ObjectId,
    ref: 'artikel',
    required: true
  }

});
Schema.post('find', function(docs, next) {
  populatePosts(docs, 'artikel', next);
});

module.exports = m.mongoose.model("kommentar", Schema);