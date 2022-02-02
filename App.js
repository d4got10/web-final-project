const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const updateItems = require("./modules/itemsPricesUpdater");

const app = express();

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/investment', require('./routes/investment.routes'))
app.use('/api/item', require('./routes/item.routes'))

if(process.evn.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000;

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }catch (e){
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

async function update_prices(){
    console.log("Started updating item prices.");
    updateItems().then(() => {
       console.log("Finished updating item prices.");
    });
}

start();

app.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));

setTimeout(update_prices, 20000);
//const job = schedule.scheduleJob('0 * * * *', function(){
//    update_prices();
//});

