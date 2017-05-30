// Calling Population function
var populatePosts = require('./../population/mongoPop').populatePosts;

// Create a new mongoose schema
var Schema = m.mongoose.Schema({
  Id_subkategori: {
    type: String,
    required: true
  },
  subkategoriNamn: {
    type: String,
    required: true
  },
  huvudkategori: {
    type: m.mongoose.Schema.Types.ObjectId,
    ref: 'huvudkategori',
    required: true
  }

});
Schema.post('find', function(docs, next) {
  populatePosts(docs, 'huvudkategori', next);
});

module.exports = m.mongoose.model("subkategori", Schema);