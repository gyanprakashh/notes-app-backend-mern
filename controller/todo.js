
const User=require('../models/todomodel');

exports.addItem=(req,res)=>{
   const {title,description}=req.body;
   if(title==='' || description===''){
       return res.status(400).json({
           error:'please provide title and description'
       });
   }
   const add=new User({
       title:title,
       description:description
   })
   add.save((err,additem)=>{
       if(err){
           return res.status(400).json({
               error:'something went wrong'
           })
       }
       res.json({
           message:'Item save succesfully'
       })
   })
}
exports.getAll=(req,res)=>{
    User.find({}).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                error:'something went wrong'
            })
        }
        return res.json({
            data:user,
            mesaage:'sucessfully'
        })
    })
}
exports.getByTitle=(req,res)=>{
    const {title}=req.body;
    User.find({title:title}).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                error:`something went wrong`
            })
        }
        if(user.length>0){
            return res.json({
                data:user,
                message:`success`
            })
        }else{
            return res.json({
                message:`Not data found`
            })
        }
        
    })
}
exports.updateItem=(req,res)=>{
    const {_id,title,description}=req.body;
    if(_id!==''){
        User.findOne({_id:_id}).exec((err,user)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            User.findByIdAndUpdate(_id,{$set:{title:title, description:description}}).exec((err,data)=>{
                if(err){
                    return res.status(400).json({
                        error:`something went wrong`
                    })
                }
                return res.json({
                    data:data,
                    message:`sucessfully updated`
                })
            })
        })
    }
}
exports.deleteItem=(req,res)=>{
    const {_id}=req.body;
    User.findByIdAndDelete({_id:_id}).exec(err=>{
        if(err){
            return res.status(400).json({
                error:`something went wrong`
            })
        }
        return res.json({
            message:`successfully deleted`
        })
    })
}