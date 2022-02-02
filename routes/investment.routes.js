const {Router} = require('express')
const User = require("../models/User");
const Investment = require('../models/Investment');
const Item = require('../models/Item')
const router = Router();
const auth = require('../middleware/auth.middleware');
const {header} = require("express-validator");
const imageToBase64 = require('image-to-base64');
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const itemUrlToName = itemUrl => {
    if(itemUrl.includes('https://steamcommunity.com/market/listings/730/')){
        let itemName = itemUrl.replace('https://steamcommunity.com/market/listings/730/', '');
        while(itemName.includes('%20')){
            itemName = itemName.replace('%20', ' ');
        }
        return itemName;
    }else{
        throw new Error("Ссылка неверна");
    }
}

const getItemPrice = async (itemName) => {
    const url = `https://steamcommunity.com/market/search/render/?appid=730&norender=1&query="${itemName}"`;
    const response = await axios(url);
    const priceText = response.data.results[0].sale_price_text;
    return parseFloat(priceText.replace('$', ''));
};


router.post('/',
    auth,
    async (req, res) =>{
        try{
            const {itemUrl, purchaseDate, amount, averageBuyPrice} = req.body;

            const itemName = itemUrlToName(itemUrl);

            let itemInDb = await Item.findOne({name: itemName});
            if(!itemInDb){
                const image = await imageToBase64(`https://api.steamapis.com/image/item/730/${itemName}`);

                const itemPrice = await getItemPrice(itemName);

                const item = new Item({name: itemName, imageUrl: image, currentPrice: itemPrice});

                await item.save();

                itemInDb = item;
                //return res.status(400).json({message: 'Такого предмета не существует'});
            }

            if(averageBuyPrice <= 0){
                return res.status(400).json({message: 'Средняя сумма покупки должна быть больше 0'});
            }

            if(amount <= 0){
                return res.status(400).json({message: 'Количество предметов должно быть больше 0'});
            }

            if(Date.now() - purchaseDate < 0){
                return res.status(400).json({message: 'Неверная дата покупки'});
            }

            const investment = new Investment({owner : req.user.userId, item: itemInDb, purchaseDate, averageBuyPrice, amount})

            await investment.save();

            res.status(201).json({message: "Запись создана"})
        }catch (e){
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова, ${e.message}`});
            console.log(e.message);
        }
})

router.get('/all',
    auth,
    async (req, res) =>{
        try{
            const investments = await Investment.find({owner: req.user.userId}).populate('item');
            res.json(investments);
        }catch (e){
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова. ${e.message}`});
        }
})

router.get(
    '/:id',
    auth,
    async (req, res) =>{
        try{
            const investment = await Investment.findById(req.params.id).populate('item');
            res.json(investment);
        }catch (e){
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
})

router.delete(
    '/:id',
    auth,
    async (req, res) => {
        try {
            await Investment.findByIdAndDelete(req.params.id);
            res.json({message: 'запись удалена'});
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
    }
)

module.exports = router;
