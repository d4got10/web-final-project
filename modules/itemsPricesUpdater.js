const Item = require("../models/Item");
const axios = require("axios");

const getItemsData = async (itemName) => {
    const url = `https://steamcommunity.com/market/search/render/?appid=730&norender=1&count=500`;
    const response = await axios(url);
    return { results: response.data.results, totalCount: response.data.total_count };
};

function PromiseTimeout(delayms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delayms);
    });
}

async function updateItems() {
    const { totalCount } = await getItemsData(0);
    const count = Math.ceil(totalCount / 100);
    for(let start = 0; start < count; start++) {
        const { results } = await getItemsData(start)

        for (let i in results) {
            const itemData = results[i];

            let item = await Item.findOne({name: itemData.name});
            if (!item) {
                item = new Item(
                    {
                        name: itemData.name,
                        currentPrice: itemData.sell_price / 100,
                        imageUrl: `https://api.steamapis.com/image/item/730/${itemData.name}`
                    })
            } else {
                item.currentPrice = itemData.sell_price / 100;
            }
            await item.save();
        }

        console.log(`Updated 100 items [${start}/${count}]`);
    }
    //for await (const item of Item.find()) {
    //    item.currentPrice = await getItemPrice(item.name);
    //    await item.save();
    //}
}

module.exports = updateItems;