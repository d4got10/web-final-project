const {Router} = require('express')
const User = require("../models/User");
const Item = require('../models/Item');
const router = Router();
const auth = require('../middleware/auth.middleware');
const imageToBase64 = require('image-to-base64');

router.post('/',
    async (req, res) =>{
        try{
            const {name, imageUrl} = req.body;

            const itemInDb = await Item.findOne({name});
            if(itemInDb){
                return res.status(400).json({message: "Предмет с таким названием уже существует"});
            }

            const image = await imageToBase64(imageUrl);

            const item = new Item({name, imageUrl: image});

            await item.save();

            res.status(201).json({message: "Предмет добавлен"})
        }catch (e){
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
})

router.get('/all',
    async (req, res) =>{
        try{
            const items = await Item.find();
            res.json(items);
        }catch (e){
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
})

router.get(
    '/:id',
    async (req, res) =>{
        try{
            const item = await Item.findById(req.params.id );
            res.json(item);
        }catch (e){
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
})

module.exports = router;
