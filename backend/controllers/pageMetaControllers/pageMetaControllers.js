const PageMeta = require('../../modal/pageMetaSchema/pageMetaSchema');
  // adjust path if needed
const slugify = require('slugify');


exports.createPageMeta = async (req, res) => {
    try {
      // Generate slug from page field
      const pageSlug = slugify(req?.body?.page, { lower: true, strict: true });
  
      // Check if a meta with the same pageSlug already exists
      const existingMeta = await PageMeta.findOne({ pageSlug: pageSlug });
      if (existingMeta) {
        return res.status(400).json({ message: `Page meta for "${pageSlug}" already exists.` });
      }
  
      // Set the generated slug
      req.body.pageSlug = pageSlug;
  
      // Create and save new PageMeta
      const pageMeta = new PageMeta(req.body);
      await pageMeta.save();
  
      res.status(201).json({
        message: "Page Meta created successfully.",
        data: pageMeta
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// Get all page metas
exports.getAllPageMetas = async (req, res) => {
  try {
    const metas = await PageMeta.find();
    res.json(metas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific page meta by ID
exports.getPageMetaById = async (req, res) => {
  try {
    const meta = await PageMeta.findById(req.params.id);
    if (!meta) return res.status(404).json({ message: "Page meta not found" });
    res.json(meta);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update page meta by ID
// adjust your model path accordingly

exports.updatePageMeta = async (req, res) => {
  try {
    const { id } = req.params;

    // Find existing meta by ID
    const existingMeta = await PageMeta.findById(id);
    if (!existingMeta) {
      return res.status(404).json({ message: "Page meta not found" });
    }

    // If 'page' is being updated — generate new slug and check for conflicts
    if (req.body.page && req.body.page !== existingMeta.page) {
      const newSlug = slugify(req.body.page, { lower: true, strict: true });

      // Check if another document already has this slug
      const slugConflict = await PageMeta.findOne({ pageSlug: newSlug, _id: { $ne: id } });
      if (slugConflict) {
        return res.status(400).json({ message: `Another page meta with slug "${newSlug}" already exists.` });
      }

      // Set new slug
      req.body.pageSlug = newSlug;
    }

    // Update the meta document
    const updatedMeta = await PageMeta.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      message: "Page Meta updated successfully.",
      data: updatedMeta
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete page meta by ID
exports.deletePageMeta = async (req, res) => {
  try {
    const meta = await PageMeta.findByIdAndDelete(req.params.id);
    if (!meta) return res.status(404).json({ message: "Page meta not found" });
    res.json({ message: "Page meta deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
