// Create a new mongoose schema
var Schema = m.mongoose.Schema({
  Id_medlem: {
    type: String,
    required: true
  },
  anvendarnamn: {
    type: String,
    required: true
  },
  fName: {
    type: String,
    required: true
  },
  yrkesTitel: {
    type: String,
    required: true
  },
  losenord: {
    type: String,
    required: true
  },
});

module.exports = m.mongoose.model("medlem", Schema);
