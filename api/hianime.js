const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const response = await axios.get("https://aniwatch-api-mixp.onrender.com/api/v2/hianime/home");
    res.json(response.data);
  } catch (error) {
    console.error("Backend fetch error:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
