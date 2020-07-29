const express =require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const morgan=require('morgan');
const cors=require('cors');
const todoRoutes=require('./routes/todo')
require('dotenv').config();
const {NODE_PORT,DATABASE_URL}=process.env;
const PORT=NODE_PORT || 8000;
const app=express();
const isdevelopement=process.env.NODE_ENV=='developemnt';
if(isdevelopement){
    app.use(morgan('dev'));
}else{
    app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
if(isdevelopement){
    app.use(cors());
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api',todoRoutes);
mongoose.connect(DATABASE_URL,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useNewUrlParser:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`);
    })
}).catch((err)=>{
    console.log(`DB connection failed ${err}`);
})


