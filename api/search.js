const axios = require("axios");

module.exports = async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(`https://aniwatch-api-mixp.onrender.com/api/v2/hianime/search/suggestion?q=${query}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
};
