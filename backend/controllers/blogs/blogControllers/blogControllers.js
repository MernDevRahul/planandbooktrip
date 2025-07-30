const Blog = require("../../../modal/blog/blogSchema");
const path = require("path");
const slugify = require("slugify");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { blogTitle, blogDescription, createdBy, blogTag,isVisibleToAll } = req.body;

    // Validate required fields
    if (!req.file || !blogTitle || !blogDescription || !createdBy || !blogTag) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including blogImage",
      });
    }

    // Generate slugName from blogTitle
    const slugName = slugify(blogTitle, { lower: true, strict: true });

    // Create a new blog
    const newBlog = new Blog({
      blogImage: path.join("uploads/blogImages", req.file.filename), // Store the file path
      blogTitle,
      blogDescription,
      createdBy,
      isVisibleToAll:isVisibleToAll,
      blogTag: blogTag.split(","), // Convert blogTag to an array if it's a comma-separated string
      slugName, // Add the generated slugName
    });

    // Save the blog to the database
    await newBlog.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy", "name email");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog by slugName
exports.getBlogBySlugName = async (req, res) => {
  try {
    const { slugName } = req.params;

    // Find the blog by slugName
    const blog = await Blog.findOne({ slugName }).populate("createdBy", "name email");
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const { blogTitle, blogDescription, createdBy, blogTag, isVisibleToAll } = req.body;

    // Find the blog to update
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Update fields
    if (req.file) {
      blog.blogImage = path.join("uploads/blogsImages", req.file.filename); // Update blogImage if a new file is uploaded
    }

    if (blogTitle) {
      const newSlug = slugify(blogTitle, { lower: true, strict: true });

      // Check for duplicate slug
      const existingBlog = await Blog.findOne({ slugName: newSlug, _id: { $ne: blog._id } });
      if (!existingBlog) {
        if (blogDescription) blog.blogDescription = blogDescription;
        if (createdBy) blog.createdBy = createdBy;
        if (blogTag) blog.blogTag = blogTag.split(",");
        if (isVisibleToAll !== undefined) blog.isVisibleToAll = isVisibleToAll;
    
        blog.blogTitle = blogTitle;
        blog.slugName = newSlug;
        // Save the updated blog
        const updatedBlog = await blog.save();      }
 // Update slugName
    }

    blog.blogTitle = blogTitle;

    if (blogDescription) blog.blogDescription = blogDescription;
    if (createdBy) blog.createdBy = createdBy;
    if (blogTag) blog.blogTag = blogTag.split(",");
    if (isVisibleToAll !== undefined) blog.isVisibleToAll = isVisibleToAll;

    // Save the updated blog
    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
