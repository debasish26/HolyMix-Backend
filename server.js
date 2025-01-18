const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/hianime/home", async (req, res) => {
    try {
      const response = await axios.get("https://aniwatch-api-mixp.onrender.com/api/v2/hianime/home");



      res.json(response.data);
    } catch (error) {
      console.error("Backend fetch error:", error);
      res.status(500).json({ error: "Error fetching data" });
    }
  });
  app.get("/api/anime/info/:id", async (req, res) => {
    try {
        const animeId = req.params.id;
        const response = await axios.get(`https://aniwatch-api-mixp.onrender.com/api/v2/hianime/anime/${animeId}`);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching the data" });
    }
});

app.get("/api/episode/:id", async (req, res) => {
    try {
        const animeId = req.params.id;
        const response = await axios.get(`https://aniwatch-api-mixp.onrender.com/api/v2/hianime/anime/${animeId}/episodes`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching the data" });
    }
});

app.get("/api/episode/sources/:episodeId/:episodeNumber/:category", async (req, res) => {
    const episodeId = req.params.episodeId;
    const episodeNumber = req.params.episodeNumber;
    const category = req.params.category;

    console.log("Received request with Episode ID:", episodeId, "Category:", category);

    if (!episodeId || !category) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        const response = await axios.get(
            `https://aniwatch-api-mixp.onrender.com/api/v2/hianime/episode/sources?animeEpisodeId=${episodeId}?${episodeNumber}&server=hd-1&category=${category}`
        );

        console.log("Fetched video source:", response.data);

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching episode sources:", error.message);
        res.status(500).json({ error: "Failed to fetch episode sources" });
    }
});
app.get("/api/search/:q", async (req, res) => {
    const query = req.params.q;

    console.log("Received query:", query,);

    try {
        const response = await axios.get(
            `https://aniwatch-api-mixp.onrender.com/api/v2/hianime/search/suggestion?q=${query}`
        );

        console.log("Fetched search suggestion:", response.data);

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching episode sources:", error.message);
        res.status(500).json({ error: "Failed to fetch episode sources" });
    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
