import { Schema, model } from "mongoose";

const userSchema =  new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    username:{type:String, required:true},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date},
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post',
    }]
});

export default model('User',userSchema);