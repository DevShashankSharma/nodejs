const shortid = require("shortid");
const Url = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.URL) {
        return res.status(400).send({ status: "Failed to create new short URL" });
    }
    const shortID = shortid();
    await Url.create({
        shortID: shortID,
        redirectURL: body.URL,
        visitedHistory: [],
    });
    return res
        .status(201)
        .send({ status: "Successfully new short URL created", shortID: shortID });
};

const handleGetAnalytics = async (req, res) => {
    const shortID = req.params.shortID;
    const entity = await Url.findOne({ shortID });
    return res.status(200).send({
        status: "Successfully get analytics",
        totalClicks: entity.visitedHistory.length,
        analytics: entity.visitedHistory,
    });
};

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};
