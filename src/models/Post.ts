import { Schema, model } from "mongoose";

const postSchema =  new Schema({
    title:{type:String, required:true},
    url:{type:String, required:true, index:true, unique:true,sparse:true, lowercase:true},
    content:{type:String, required:true},
    image:{type:String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
});

export default model('Post',postSchema);