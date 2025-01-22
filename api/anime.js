const axios = require("axios");

module.exports = async (req, res) => {
  const animeId = req.query.id;

  try {
    const response = await axios.get(`https://aniwatch-api-mixp.onrender.com/api/v2/hianime/anime/${animeId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the data" });
  }
};
