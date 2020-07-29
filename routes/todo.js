const express=require('express');
const router=express.Router();
const {addItem,getAll,getByTitle,updateItem,deleteItem} =require('../controller/todo');

router.post('/add-item',addItem);
router.get('/get-all',getAll);
router.post('/get-one',getByTitle)
router.post('/update-item',updateItem);
router.post('/delete-item',deleteItem);

module.exports=router;