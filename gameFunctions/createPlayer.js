const game = require("../gameData");
const config = require("../config");
const randomString = require("randomstring").generate;

module.exports = (id, name, effects) => {
    const secret = randomString(config.secretLength);
    game.players[id] = {
        name,
        score: 100,
        effects,
        secret,
        plague: Math.floor(Math.random() * 5),
        bulletPower: 2,
        speed: 2,
        speedBoost: {
            active: false,
            full: 50
        },
        x: Math.floor(Math.random() * config.innerMap) - config.innerMap / 2,
        y: Math.floor(Math.random() * config.innerMap) - config.innerMap / 2,
        direction: 0
    };
    return secret;
};