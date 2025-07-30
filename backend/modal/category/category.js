const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slugName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  image: {
    type: String,
    default: ""
  },
  isVisibleOnNavbar: {
    type: Boolean,
    default: false
  },
  subCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", }],
});

module.exports = mongoose.model("Category", categorySchema);
