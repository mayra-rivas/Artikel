// Create a new mongoose schema
var Schema = m.mongoose.Schema({
  Id_bild: {
    type: String,
    required: true
  },
  beskrivning: {
    type: String,
    required: true
  },
  namn_fotograf: {
    type: String,
    required: true
  },
  img_sokvag: {
    type: String,
    required: true
  }

});

module.exports = m.mongoose.model("bild", Schema);