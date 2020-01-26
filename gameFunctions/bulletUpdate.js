const game = require("../gameData");
const config = require("../config");
const calculateMovement = require("../util/move");

const removeBullet = i => game.bullets.splice(i, 1);

module.exports = () => {
    game.bullets.forEach((bullet, i) => {

        //Movement
        const movement = calculateMovement(bullet.direction, config.bulletSpeed);
        bullet.x += movement.x;
        bullet.y += movement.y;

        //Map Bounds
        if (
            bullet.x < 0 - config.mapSize / 2 ||
            bullet.x > 0 + config.mapSize / 2 ||
            bullet.y < 0 - config.mapSize / 2 ||
            bullet.y > 0 + config.mapSize / 2
        ) return removeBullet(i);
    });
};