const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const Sequelize = require('sequelize');
const answers = require('./answers');
const express = require('express');
const app = express();
const pocketOptionController = require('./controllers/pocketOptionController');
const sequelize = require('./models/config');
require('dotenv').config();

const port = process.env.PORT || 1338;

app.get('/pocketoption', pocketOptionController.pocketEventReceived);
app.get('/trader/:id', pocketOptionController.getTrader);

app.listen(port, () => console.log('Server is listening on port: 1338'));

sequelize.sync({force: true})
    .then(result => {
        console.log('Synchronized successfully!');
    })
    .catch(err => console.log(`Error sync: ${err}`));

const bot = new TelegramBot(process.env.API_KEY, {
    polling: true
});

bot.setMyCommands(
    [
        {
            command: "start",
            description: "Launch bot"
        },
        {
            command: "contact",
            description: "Contact our manager"
        }
    ]
);

bot.on('text', async msg => {
    try {
        if (msg.text === '/start') {
            //answers.sendGreet(bot, msg);
            answers.sendNavigationMenu(bot, msg);
        }
        else if (msg.text === '/contact') {
            answers.sendManagerContact(bot, msg);
        }
        else if (msg.text.match(/ID: \d+/)) {
            answers.sendPersonalRobot(bot, msg);
        }
        else if (msg.text.includes("ID:")) {
            answers.sendProfileIDIncorrectFormat(bot, msg);
        }
        else if (msg.text === '🤖 Get robot') {
            answers.sendPurchaseMethod(bot, msg);
        }
        else if (msg.text === '💸 Free') {
            answers.sendFreePurchaseCountry(bot, msg);
        }
        else if (msg.text === "🌎 I'm not from Russia") {
            answers.sendFreePurchaseNotRussia(bot, msg);
        }
        else if (msg.text === 'Russia') {
            answers.sendFreePurchaseRussia(bot, msg);
        }
        else if (msg.text === '🔎 Check my profile ID') {
            answers.sendCheckProfileID(bot, msg);
        }
        else if (msg.text === '🔎 Проверить ID профиля') {
            answers.sendCheckProfileIDRussian(bot, msg);
        }
        else if (msg.text === '💳 Paid') {
            answers.sendPaidPurchaseMethod(bot, msg);
        }
        else if (msg.text === 'Bitcoin') {
            answers.sendPaidPurchaseByBitcoin(bot, msg);
        } 
        else if (msg.text === 'USDT') {
            answers.sendPaidPurchaseByTether(bot, msg);
        }
        else if (msg.text === 'Ethereum') {
            answers.sendPaidPurchaseByEthereum(bot, msg);
        }
        else if (msg.text === '📝 How to use') {
            answers.sendHowToUseRobot(bot, msg);
        }
        else if (msg.text === '🧠 How the robot works') {
            answers.sendHowTheRobotWorks(bot, msg);
        }
        else if (msg.text === '⚙️ How to install robot') {
            answers.sendHowToInstallRobot(bot, msg);
        }
    }
    catch (err) {
        fs.appendFile(__dirname + "/error.log", err + '\n', (err) => {
            console.log(err);
        });
    }
});

console.log(`Status: Running\nLaunch date: ${new Date()}`);