const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const Sequelize = require('sequelize');
const answers = require('./answers');
const express = require('express');
const app = express();
const pocketOptionController = require('./controllers/pocketOptionController');
const sequelize = require('./models/config');
require('dotenv').config();

const PORT = process.env.PORT;

app.get('/pocket', pocketOptionController.pocketEventReceived);
app.get('/trader/:id', pocketOptionController.getTrader);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));

sequelize.sync()
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
        /*else if (msg.text.match(/\d+/)) {
            answers.sendPersonalRobot(bot, msg);
        }
        else if (msg.text.includes("ID:")) {
            answers.sendProfileIDIncorrectFormat(bot, msg);
        }*/
        else if (msg.text === '🤖 Get robot') {
            answers.sendRobotDescriptionAndPurchaseMethod(bot, msg);
        }
        /*else if (msg.text === '🤝 Partnership') {
            answers.sendFreePurchaseSteps(bot, msg);
        }*/
        /*else if (msg.text === "🌎 I'm not from Russia") {
            answers.sendFreePurchaseNotRussia(bot, msg);
        }
        else if (msg.text === 'Russia') {
            answers.sendFreePurchaseRussia(bot, msg);
        }*/
        else if (msg.text === '💳 I want to get a robot') {
            answers.sendChooseService(bot, msg);
        }
        else if (msg.text === 'Basic robot') {
            answers.sendBasicRobot(bot, msg);
        }
        else if (msg.text === 'Basic robot for BTC') {
            answers.sendBasicRobotForBTC(bot, msg);
        }
        else if (msg.text === 'Basic robot for USDT') {
            answers.sendBasicRobotForTether(bot, msg);
        }
        else if (msg.text === 'Basic robot for Ethereum') {
            answers.sendBasicRobotForEthereum(bot, msg);
        }
        else if (msg.text === 'Standard robot') {
            answers.sendStandardRobot(bot, msg);
        }
        else if (msg.text === 'Standard robot for BTC') {
            answers.sendStandardRobotForBTC(bot, msg);
        }
        else if (msg.text === 'Standard robot for USDT') {
            answers.sendStandardRobotForTether(bot, msg);
        }
        else if (msg.text === 'Standard robot for Ethereum') {
            answers.sendStandardRobotForEthereum(bot, msg);
        }
        else if (msg.text === 'Premium robot') {
            answers.sendPremiumRobot(bot, msg);
        }
        else if (msg.text === 'Premium robot for BTC') {
            answers.sendPremiumRobotForBTC(bot, msg);
        }
        else if (msg.text === 'Premium robot for USDT') {
            answers.sendPremiumRobotForTether(bot, msg);
        }
        else if (msg.text === 'Premium robot for Ethereum') {
            answers.sendPremiumRobotForEthereum(bot, msg);
        }
        else if (msg.text === '🔎 Check my profile ID') {
            answers.sendCheckProfileID(bot, msg);
        }
        else if (msg.text === '🔎 Проверить ID профиля') {
            answers.sendCheckProfileIDRussian(bot, msg);
        }
        else if (msg.text === '💳 Fix price') {
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