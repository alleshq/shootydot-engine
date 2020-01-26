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
        plague: false,
        speed: 1,
        speedBoost: {
            active: false,
            full: 0
        },
        x: 0,
        y: 0,
        direction: 0
    };
    return secret;
};