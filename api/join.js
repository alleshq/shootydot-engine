const createPlayer = require("../gameFunctions/createPlayer");
const randomString = require("randomstring").generate;
const game = require("../gameData");

module.exports = (req, res) => {
    if (game.players.length > 50) return res.status(503).json({err: "serverFull"});
    
    //TODO: AllesID Auth
    const id = randomString(32);
    const secret = createPlayer(id, "Archie", []);
    res.json({id, secret});
};