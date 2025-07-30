const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogImage: { type: String, required: true },
    blogTitle: { type: String, required: true },
    isVisibleToAll: { type: Boolean, default: false },
    blogDescription: { type: String, required: true },
    createdBy: { type: String, required: true } ,
    blogTag: { type: [String], required: true },
    slugName: { type: String, unique: true, required: true }, // Added slugName fieldblogTag: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);module.exports = mongoose.model("Blog", blogSchema);

