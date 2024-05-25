const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

require('dotenv').config();

const bot = new TelegramBot(process.env.API_KEY, {
    polling: true
});

const commands = [
    {
        command: "start",
        description: "Launch bot"
    },
    {
        command: "help",
        description: "Show help"
    }
];

bot.setMyCommands(commands);

bot.on('text', async msg => {
    try {
        if (msg.text === '/start') {
            await bot.sendMessage(msg.chat.id, `Hello, ${msg.from.first_name} 👋🏻`, {
                reply_markup: {
                    keyboard: [
                        ['🤖 Get robot', '📝 How to use'],
                        ['🧠 How the robot works']
                    ],
                    one_time_keyboard: true
                }
            });
        }
        else if (msg.text === '🤖 Get robot') {
            await bot.sendMessage(msg.chat.id, '🛒 Choose the method of getting the robot', {
                reply_markup: {
                    keyboard: [
                        ['💸 Free', '💳 Paid']
                    ],
                    one_time_keyboard: true
                }
            });
        }
        else if (msg.text === '💸 Free') {
            await bot.sendMessage(msg.chat.id, 
                '👇👇👇 Below is step-by-step instruction for getting a robot for free\n\n' +
                '🔗 1. Register a new account using the link provided below\n' +
                '🔝 2. Top up your account balance minimum at least 50$\n' +
                '✍🏽 3. Copy your ID from profile tab (photo below)\n' +
                '🤖 4. Get robot extension for browser\n\n' + 
                '💡💡💡 <i>We highly recommend to top up your account with <b>200$</b></i>', {
                    parse_mode: 'HTML'
                }
            );
            await bot.sendPhoto(msg.chat.id, './images/profile-id.png');
        }
        else if (msg.text === '💳 Paid') {
            await bot.sendMessage(msg.chat.id, 
                '💳 Сhoose the preferred method', {
                    reply_markup: {
                        keyboard: [
                            ['Bitcoin', 'USDT'],
                            ['Ethereum']
                        ],    
                        one_time_keyboard: true
                    }
                }
            );
        }
        else if (msg.text === 'Bitcoin') {
            request('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', async (err, response, body) => {
                await bot.sendMessage(msg.chat.id, 
                    `1. Send ${(99 / JSON.parse(body).USD).toFixed(5)} BTC to wallet: <b>bc1q9566wdw6e5s8r7zpkf4mp4uzglejkfhjwwmhdm</b>\n2. Send your wallet ID to our manager`,
                    {
                        parse_mode: 'HTML'
                    }
                );
            });
        } 
        else if (msg.text === 'USDT') {
            request('https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USD', async (err, response, body) => {
                await bot.sendMessage(msg.chat.id, 
                    `1. Send ${(99 / JSON.parse(body).USD).toFixed(5)} USDT to address: <b>TSVyj9hEx2vjA3CVCC3312erwVoRboGLNw</b>\n2. Send your wallet ID to our manager`,
                    {
                        parse_mode: 'HTML'
                    }
                );
            });
        }
        else if (msg.text === 'Ethereum') {
            request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', async (err, response, body) => {
                await bot.sendMessage(msg.chat.id, 
                    `1. Send ${(99 / JSON.parse(body).USD).toFixed(5)} ETH to address: <b>0xA1601DB02B02e441BAcDc3c2763490832f1F2564</b>\n2. Send your wallet ID to bot`,
                    {
                        parse_mode: 'HTML'
                    }
                );
            });
        }
        else if (msg.text === '📝 How to use') {
            await bot.sendMessage(msg.chat.id, 
                '✅ 1. Install the extension that our manager provided\n<i>For more information on the installation instructions, see the <b>«Install extension» section</b></i>\n' +
                '✅ 2. In the amount field, enter the amount of the transaction you want the robot to open\n' +
                '✅ 3. Choose «Use overlap» checkbox to turn on overlap mode.\n' +
                '✅ 4. Choose «Is live trading» if you are going to trade real market (not OTC)\n' +
                '✅ 5. Press «Start» button\n' + 
                '✅ 6. The robot opens an option for the expiration time that you choose on the trading platform\n' +
                "⚠️ 7. Don't close the robot extension or active browser tab. This may result in the robot not functioning correctly\n" +
                '✅ 8. Wait for the robot to analyze\n' +
                '✅ 9. Take your profit 💲💲💲',
                {
                    parse_mode: 'HTML'
                }
            );
        }
        else if (msg.text === '🧠 How the robot works') {
            await bot.sendMessage(msg.chat.id, 
                '🧠🧠🧠 The bot is a trainable neural network using the elastic propagation method\n' +
                '🏋️🏋️🏋️ The robot was developed in 2019 and has been trained for 5 years on the basis of market indicators over the past 25 years, which gives ultra-high indicators of forecasting accuracy\n' +
                '🕗🕗🕗 The robot does not hack the brokerage infrastructure in any way and gives a forecast based on training from a sample of early forecasts\n\n' +
                '<b>A statistics of robot accurancy by years: </b>\n' +
                '• By 01.01.2020 - 67.49% of negative predictions\n' +
                '• By 01.01.2021 - 38.24% of negative predictions\n' +
                '• By 01.01.2022 - 11.71% of negative predictions\n' +
                '• By 01.01.2023 - 4.28% of negative predictions\n' +
                '• By 01.01.2024 - 0.487% of negative predictions',
                {
                    parse_mode: 'HTML'
                }
            );
        }
    }
    catch (err) {
        fs.appendFile(__dirname + "/error.log", err + '\n', (err) => {
            if (err) {
               throw err;
            }
        });
    }
});

console.log('Bot is running...');