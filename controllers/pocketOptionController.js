const Trader = require('../models/trader');

const pocketEventReceived = async (req, res) => {
    console.log('Postback invoked!');
    try {
        const data = req.query;
        console.log(data);
        if (data) {
            if ('trader_id' in data) {
                const traderId = data['trader_id'];
                if (traderId) {
                    Trader.findOne({where: {profileId: traderId}, raw: true})
                        .then(trader => {
                            if (trader) {
                                console.log(`Trader ${traderId} is already exists. Skip it`);
                            }
                            else {
                                Trader.create({profileId: traderId, createdAt: new Date()})
                                    .then(result => {
                                        console.log(`Trader ${traderId} added successfully!`);
                                    });
                            }
                        });
                }
            }
        }
    }
    catch (err) {
        fs.appendFile(__dirname + "/error.log", err + '\n', (err) => {
            console.log(err);
        });
        res.status(500).json({err});
    }
};

const getTrader = async (req, res) => {
    try {
        const profileId = req.params['id'];
        if (!profileId) {
            return res.status(400).json({err: 'Not found'});
        }
        Trader.findOne({where: {profileId}, raw: true})
            .then(trader => {
                if (trader) {
                    return res.status(200).json({result: true});
                }
                else {
                    return res.status(404).json({result: false});
                }
            });
    }
    catch (err) {
        fs.appendFile(__dirname + "/error.log", err + '\n', (err) => {
            console.log(err);
        });
        res.status(500).json({err});
    }
};

module.exports = { pocketEventReceived, getTrader };