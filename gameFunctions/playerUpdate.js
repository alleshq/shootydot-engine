const game = require("../gameData");
const config = require("../config");
const calculateMovement = require("../util/move");

module.exports = () => {
    Object.keys(game.players).forEach(id => {
        const player = game.players[id];

        //Movement
        const movement = calculateMovement(player.direction, player.speed * (player.speedBoost ? 2 : 1));
        player.x += movement.x;
        player.y += movement.y;

        //Map Bounds
        if (
            player.x < 0 - config.mapSize / 2 ||
            player.x > 0 + config.mapSize / 2 ||
            player.y < 0 - config.mapSize / 2 ||
            player.y > 0 + config.mapSize / 2
        ) player.score--;

        //Update
        if (player.score > 0) {
            game.players[id] = player;
        } else {
            delete game.players[id];
        }
    });
};