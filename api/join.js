const game = require("../gameData");
const config = require("../config");
const randomString = require("randomstring").generate;

module.exports = (req, res) => {
    if (Object.keys(game.players).length > 50) return res.status(503).json({err: "serverFull"});
    if (Object.keys(game.players).includes(req.user.id)) return res.status(429).json({err: "alreadyPlaying"});

    const teams = req.user.teams.map(team => team.teamid);
    const secret = randomString(config.secretLength);

    game.players[req.user.id] = {
        name: req.user.username,
        score: 100,
        effects: [],
        secret,
        color: teams.includes("alles") ? "#4287f5" : "#e74c3c",
        plague: Math.floor(Math.random() * 5) === 0,
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
    
    res.json({id: req.user.id, secret});
};