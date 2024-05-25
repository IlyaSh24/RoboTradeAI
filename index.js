const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

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
                        ['🤖 Get robot', '📝 How to use']
                    ],
                    one_time_keyboard: true
                }
            });
        }
        else if (msg.text === '🤖 Get robot') {
            await bot.sendMessage(msg.chat.id, '🛒 There are two ways to purchase a robot', {
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
                '🔗 1. Register a new account using the link provided below\n' +
                '🔝 2. Top up your account balance minimum at least 50$\n' +
                '✍🏽 3. Copy your ID from profile tab (photo below)\n' +
                '🤖 4. Get robot extension for browser\n\n' + 
                '<i>Recommended deposit for stable profit is <b>200$</b></i>\n', {
                    parse_mode: 'HTML'
                }
            );
            await bot.sendPhoto(msg.chat.id, './images/profile-id.png');
        }
        else if (msg.text === '💳 Paid') {
            await bot.sendMessage(msg.chat.id, 
                '💳 Сhoose the preferred method that is convenient for you', {
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
            await bot.sendMessage(msg.chat.id, '1. Send 0.001 BTC to address: TEST_ADDRESS\n2. Send your wallet ID to bot');
        } 
        else if (msg.text === 'USDT') {
            await bot.sendMessage(msg.chat.id, '2. Send 99 USDT to address: TEST_ADDRESS\n2. Send your wallet ID to bot');
        }
        else if (msg.text === 'Ethereum') {
            await bot.sendMessage(msg.chat.id, '3. Send 0.01 ETH to address: TEST_ADDRESS\n3. Send your wallet ID to bot');
        }
        else if (msg.text === '📝 How to use') {
            await bot.sendMessage(msg.chat.id, 'Use it carefully, bro!');
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