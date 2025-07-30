const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slugName: { type: String, required: true },
 isVisibleOnNavbar: { type: Boolean, default: false },
 categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
