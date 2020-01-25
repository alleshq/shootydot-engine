const game = require("../gameData");
const calculateMovement = require("../util/move");

module.exports = () => {
    Object.keys(game.players).forEach(id => {
        const player = game.players[id];
        const movement = calculateMovement(player.direction, player.speed * (player.speedBoost ? 2 : 1));
        player.x += movement.x;
        player.y += movement.y;
        game.players[id] = player;
    });
};