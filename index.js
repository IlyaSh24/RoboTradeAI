const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const answers = require('./answers');

require('dotenv').config();

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