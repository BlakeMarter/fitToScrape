const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SavedArtSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const SavedArticle = mongoose.model("SavedArticle", SavedArtSchema);

module.exports = SavedArticle;