// Create a new mongoose schema
var Schema = m.mongoose.Schema({
  Id_huvudkategori: {
    type: String,
    required: true
  },
  huvudkategori_typ: {
    type: String,
    required: true
  }
});

module.exports = m.mongoose.model("huvudkategori", Schema);