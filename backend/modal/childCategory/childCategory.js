const mongoose = require("mongoose");

const childCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
});

module.exports = mongoose.model("childCategory", childCategorySchema);
