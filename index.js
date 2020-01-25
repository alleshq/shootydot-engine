const game = require("./gameData");
const config = require("./config");

//HTTP Server
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
http.listen(8081);

//Setup Functions
require("./gameFunctions/generateStars");

//Socket.io Emit
setInterval(() => {
    io.emit("data", {
        players: game.players.map(player => ({
            name: player.name
        })),
        stars: game.stars
    });
}, 1000 / config.tickSpeed);