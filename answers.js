const request = require('request');
const fs = require('fs');
const fsExtra = require('fs-extra');
const zipper = require('zip-local');

const host = process.env.HOST || 'http://195.2.74.29';
const port = process.env.PORT || 1338;

// const sendGreet = async (bot, msg) => {
//     await bot.sendMessage(msg.chat.id, `Hello, ${msg.from.first_name}`);
// };

const sendNavigationMenu = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, `Choose the navigation option below 👇`, {
        reply_markup: {
            keyboard: [
                ['🤖 Get robot', '📝 How to use'],
                ['🧠 How the robot works', '⚙️ How to install robot']
            ],
            one_time_keyboard: true
        }
    });
};

const sendPurchaseMethod = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, '🛒 Choose the method of getting the robot', {
        reply_markup: {
            keyboard: [
                ['🤝 Partnership', '💳 Fix price']
            ],
            one_time_keyboard: true
        }
    });
};

const sendFreePurchaseCountry = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        msg.from.first_name + ', choose your country 👇', {
            reply_markup: {
                keyboard: [
                    ["🌎 I'm not from Russia", "Russia"]
                ],
                one_time_keyboard: true
            }
        }
    );
};

const sendFreePurchaseSteps = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        '👇👇👇 Below is step-by-step instruction for getting a robot\n\n' +
        '🔗 1. Register a new account using the link provided below\n' +
        '🔝 2. Top up your account balance minimum at least 50$\n' +
        '✍🏽 3. Copy your ID from profile tab (photo below) and send to robot in message field\n' +
        '🤖 4. If your profile is registered correctly, the robot generates the extension for you\n\n' + 
        '👉 Register link: <a href="https://pocket1.click/smart/4jlv8RwNpcPNtF">Go and register</a>\n\n' +
        '💡💡💡 <i>Advice: We highly recommend to top up your account with <b>200$</b></i>', {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['🔎 Check my profile ID']
                ],
                one_time_keyboard: true
            }
        }
    );
    await bot.sendPhoto(msg.chat.id, './images/profile-id.png');
};

const sendCheckProfileID = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 'Send your profile ID here in the following format: <b>ID: [your profile ID]</b>', {
        parse_mode: 'HTML'
    });
    sendNavigationMenu(bot, msg);
};

const sendCheckProfileIDRussian = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 'Отправьте в сообщении ваш ID профиля в следующем формате: <b>ID: [ID вашего профиля]</b>', {
        parse_mode: 'HTML'
    });
    sendNavigationMenu(bot, msg);
}

const sendProfileIDIncorrectFormat = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 'Please, enter your ID in the correct format');
    sendNavigationMenu(bot, msg);
};

const sendPersonalRobot = async (bot, msg) => {
    try {
        const profileId = msg.text.match(/\d+/);
        request(`${host}:${port}/trader/${profileId}`, async (err, response, body) => {
            const jsonResult = JSON.parse(body);
            if (jsonResult.result) {
                const robotJsFileContent = fs.readFileSync(__dirname + '/static/extension/robot.js')
                const robotJsFileContentWithProfileId = robotJsFileContent.toString().replace('#PROFILE_ID_HERE#', profileId);
                const traderDirPath = __dirname + '/static/traders/' + profileId;
                if (!fs.existsSync(traderDirPath)) {
                    console.log("I'm here");
                    fs.mkdirSync(traderDirPath);
                }
                fsExtra.copySync(__dirname + '/static/extension', traderDirPath);
                // Replace content of robot.js (where checks)
                fs.writeFileSync(traderDirPath + '/robot.js', robotJsFileContentWithProfileId);
                // Compress and create zip file
                zipper.sync.zip(traderDirPath).compress().save(traderDirPath + `/robot_${profileId}.zip`);
                await bot.sendDocument(msg.chat.id, `${traderDirPath}/robot_${profileId}.zip`, {
                    caption: '🔥 Our congratulations! Your extension is ready. Follow the instruction to install and use it'
                });
                await bot.sendMessage(msg.chat.id, '👇 Learn how to install the extension in the browser ');
                sendNavigationMenu(bot, msg);
            }
            else {
                await bot.sendMessage(msg.chat.id, '😕 Your profile ID is not found. If you are sure that you registered <b>correctly</b>, please, contact our manager 👉 <i>@robotradeaimanager</i>', {
                    parse_mode: 'HTML'
                });
                sendNavigationMenu(bot, msg);
            }
        });
    }
    catch (err) {
        fs.appendFile(__dirname + "/error.log", err + '\n', (err) => {
            console.log(err);
        });
    }
};

const sendFreePurchaseRussia = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        '👇👇👇 Ниже описана пошаговая инструкция по бесплатному приобретению робота\n\n' +
        '🔗 1. Зарегистрируйте новый аккаунт по ссылке ниже\n' +
        '🔝 2. Пополните депозит на сумму от 50$\n' +
        '✍🏽 3. Скопируйте свой ID профиля (фото представлено ниже) и отправьте нашему менеджеру <i>@robotradeaimanager</i>\n' +
        '🤖 4. Наш менеджер проверит соблюдение условий и отправит Вам робота\n\n' + 
        '👉 Ссылка для регистрации: <a href="https://po-ru.click/smart/4jlv8RwNpcPNtF">Перейти и зарегистрироваться</a>\n\n' +
        '💡💡💡 <i>Совет: Мы настоятельно рекомендуем пополнять аккаунт на сумму от <b>200$</b></i>', {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['🔎 Проверить ID профиля']
                ]
            }
        }
    );
    await bot.sendPhoto(msg.chat.id, './images/profile-id.png');
};

const sendPaidPurchaseMethod = async (bot, msg) => {
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
};

const sendPaidPurchaseByBitcoin = async (bot, msg) => {
    request('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', async (err, response, body) => {
        await bot.sendMessage(msg.chat.id, 
            `1. Send ${(29 / JSON.parse(body).USD).toFixed(5)} BTC (29$) to wallet: <span class="tg-spoiler">bc1q9566wdw6e5s8r7zpkf4mp4uzglejkfhjwwmhdm</span>\n` +
            '2. Send your wallet to our manager @robotradeaimanager. After that, our manager will check the receipt and contact you within <i>~24 hours</i> and will <b>send the robot</b>',
            {
                parse_mode: 'HTML'
            }
        );
        sendNavigationMenu(bot, msg);
    });
}

const sendPaidPurchaseByTether = async (bot, msg) => {
    request('https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USD', async (err, response, body) => {
        await bot.sendMessage(msg.chat.id, 
            `1. Send ${(29 / JSON.parse(body).USD).toFixed(5)} USDT to wallet: <span class="tg-spoiler">TSVyj9hEx2vjA3CVCC3312erwVoRboGLNw</span>\n` +
            '2. Send your wallet to our manager @robotradeaimanager. After that, our manager will check the receipt and contact you within <i>~24 hours</i> and will <b>send the robot</b>',
            {
                parse_mode: 'HTML'
            }
        );
        sendNavigationMenu(bot, msg);
    });
};

const sendPaidPurchaseByEthereum = async (bot, msg) => {
    request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', async (err, response, body) => {
        await bot.sendMessage(msg.chat.id, 
            `1. Send ${(29 / JSON.parse(body).USD).toFixed(5)} ETH (29$) to wallet: <span class="tg-spoiler">0xA1601DB02B02e441BAcDc3c2763490832f1F2564</span>\n` +
            '2. Send your wallet to our manager @robotradeaimanager. After that, our manager will check the receipt and contact you within <i>~24 hours</i> and will <b>send the robot</b>',
            {
                parse_mode: 'HTML'
            }
        );
        sendNavigationMenu(bot, msg);
    });
};

const sendHowToUseRobot = async (bot, msg) => {
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
    sendNavigationMenu(bot, msg);
};

const sendHowTheRobotWorks = async (bot, msg) => {
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
    sendNavigationMenu(bot, msg);
};

const sendHowToInstallRobot = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        '1. Open <b>Chrome browser</b>\n', 
        {
            parse_mode: 'HTML'
        }
    );
    await bot.sendPhoto(msg.chat.id, './images/installation/home.png');
    await bot.sendMessage(msg.chat.id, 
        '2. In the upper right corner click <b>"Three dots"</b>. In the expanded panel, select <i>«Extensions»</i> -> <i>«Manage Extensions»</i>',
        {
            parse_mode: 'HTML'
        }
    );
    await bot.sendPhoto(msg.chat.id, './images/installation/extensions.png');
    await bot.sendMessage(msg.chat.id, 
        '3. Switch to <i>«Developer mode»</i> with toggle button in the right upper corner and click <i>Load unpacked</i>',
        {
            parse_mode: 'HTML'
        }
    );
    await bot.sendPhoto(msg.chat.id, './images/installation/load_developer.png');
    await bot.sendMessage(msg.chat.id, 
        '4. Choose the folder with your extension and the robot is ready to use',
        {
            parse_mode: 'HTML'
        }
    );
    await bot.sendPhoto(msg.chat.id, './images/installation/ready.png');
    sendNavigationMenu(bot, msg);
};

const sendManagerContact = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        "❓ If you have any questions that wasn't covered by bot, please contact our manager 👉 <i>@robotradeaimanager</i>",
        {
            parse_mode: 'HTML'
        }
    );
    sendNavigationMenu(bot, msg);
};

module.exports = { 
    //sendGreet, 
    sendNavigationMenu, 
    sendPurchaseMethod, 
    sendFreePurchaseCountry,
    sendFreePurchaseSteps,
    sendCheckProfileID,
    sendCheckProfileIDRussian,
    sendProfileIDIncorrectFormat,
    sendPersonalRobot,
    sendFreePurchaseRussia,
    sendPaidPurchaseMethod,
    sendPaidPurchaseByBitcoin,
    sendPaidPurchaseByTether,
    sendPaidPurchaseByEthereum,
    sendHowToUseRobot,
    sendHowTheRobotWorks,
    sendHowToInstallRobot,
    sendManagerContact
};