const {model,Schema}=require('mongoose');

const todSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

},{
    timestamps:true
});
module.exports=model('user',todSchema);