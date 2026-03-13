import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog");
    console.log("Mongodb connection established successfully");
  } catch (error) {
    console.log("Error occured in connection");
    console.log(error);
  }
};

export default connect;
