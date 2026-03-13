import mongoose from "mongoose";

const learnSchema=new mongoose.Schema({
    learn:{
        type:String,
        required:true
    },
    descriptions:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Learn=mongoose.model("Learn",learnSchema);

export default Learn;