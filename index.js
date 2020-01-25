const game = require("./gameData");
const config = require("./config");

//HTTP Server
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
http.listen(8081);

//Setup Functions
require("./gameFunctions/generateStars")();

//Tick
setInterval(() => {

    //Emit Game Data
    io.emit("data", {
        players: (() => {
            const players = {};
            Object.keys(game.players).forEach(id => {
                const player = game.players[id];
                players[id] = {
                    name: player.name,
                    score: player.score,
                    x: player.x,
                    y: player.y,
                    speedBoost: player.speedBoost,
                    plague: player.plague
                };
            });
            return players;
        })(),
        stars: game.stars
    });

    //Game Functions
    require("./gameFunctions/newStar")();
    require("./gameFunctions/playerUpdate")();

}, 1000 / config.tickSpeed);