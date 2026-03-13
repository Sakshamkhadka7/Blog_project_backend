import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

blogSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

blogSchema.set("toObject", { virtuals: true });
blogSchema.set("toJSON", { virtuals: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
