// Calling Population function
var populatePosts = require('./../population/mongoPop').populatePosts;

// Create a new mongoose schema
var Schema = m.mongoose.Schema({
  Id_Artikel: {
    type: String,
    required: true
  },
  Rubrik: {
    type: String,
    required: true
  },
  Ingress: {
    type: String,
    required: true
  },
  Brodtext: {
    type: String,
    required: true
  },
  DatumPublicerad: {
    type: Date,
    required: true
  },
  subkategori: {
    type: m.mongoose.Schema.Types.ObjectId,
    ref: 'subkategori',
    required: true
  }

});
Schema.post('find', function(docs, next) {
  populatePosts(docs, 'subkategori', next);
});

module.exports = m.mongoose.model("artikel", Schema);