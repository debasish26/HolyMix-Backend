const path = require("path");

module.exports = (req, res) => {
  const { filename } = req.query;  // Use query parameters in serverless functions
  const filePath = path.join(__dirname, "../public/videos", filename);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
};
