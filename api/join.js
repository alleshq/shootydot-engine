const createPlayer = require("../gameFunctions/createPlayer");
const game = require("../gameData");

module.exports = (req, res) => {
    if (Object.keys(game.players).length > 50) return res.status(503).json({err: "serverFull"});
    if (Object.keys(game.players).includes(req.user.id)) return res.status(429).json({err: "alreadyPlaying"});

    const teams = req.user.teams.map(team => team.teamid);
    var color;
    if (teams.includes("alles")) {
        color = "#4287f5";
    } else {
        color = "#e74c3c";
    }
    
    const secret = createPlayer(
        req.user.id,
        req.user.username,
        [],
        color
    );
    res.json({id: req.user.id, secret});
};