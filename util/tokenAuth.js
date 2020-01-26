const axios = require("axios");

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (typeof token !== "string") return res.status(400).json({err: "noAuthToken"});

    const oauthFail = () => res.status(401).json({err: "oauthFailed"});

    //Get Token
    oauth("token", token).then(response => {
        const tokenData = response.data;
        if (!tokenData.scopes.includes("basic-profile")) return oauthFail();
        
        //Get data about user
        oauth("me", token).then(response => {
            req.user = response.data;
            next();
        }).catch(oauthFail);
    }).catch(oauthFail);
};

const oauth = (endpoint, token) => {
    return axios.get(`https://api.alles.cx/v1/${endpoint}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
};