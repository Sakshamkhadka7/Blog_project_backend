import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("Mongodb connection established successfully");
  } catch (error) {
    console.log("Error occured in connection");
    console.log(error);
  }
};

export default connect;
