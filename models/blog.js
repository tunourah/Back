import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,   
    },
    body: {
      type: String,
      required: true,  
    },
    name: {
      type: String,
      required: true,
    },
    isEmployee: {
      type: Boolean,   
      required: true,
    }
  },
  { timestamps: true }  
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
