import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, slug, content } = req.body;
    const image = req.file.filename;
    const user = req.userMid;

    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      author: user._id,
      image: image,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const displayBlog = async (req, res) => {
  try {
    const blog = await Blog.find().populate("comments");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog Found",
      blog: blog,
    });
  } catch (error) {
    console.log("Error occured in a display Blog", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const updateBlog = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const user = req.userMid;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Unauthorize to update",
      });
    }
    const { title, slug, content } = req.body;

    let image = req.file.filename;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title,
        slug: slug,
        content: content,
        image: image,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Blog Updated",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log("Error occured in a update Blog", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  if (!id) {
    return res.status(500).json({
      success: false,
      message: "Id not found",
      error: error.message,
    });
  }

  const deletedBlog = await Blog.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Blog deleted",
    deletedBlog: deletedBlog,
  });
};
  