const createPlayer = require("../gameFunctions/createPlayer");
const game = require("../gameData");

module.exports = (req, res) => {
    if (Object.keys(game.players).length > 50) return res.status(503).json({err: "serverFull"});
    if (Object.keys(game.players).includes(req.user.id)) return res.status(429).json({err: "alreadyPlaying"});
    
    const secret = createPlayer(req.user.id, req.user.username, []);
    res.json({id: req.user.id, secret});
};