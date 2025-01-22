// api/video.js
const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: 'Filename query parameter is required' });
  }

  const filePath = path.join(__dirname, '..', 'public', 'videos', filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const fileExtension = path.extname(filename).toLowerCase();

  // Set proper content type based on the file extension
  if (fileExtension === '.m3u8') {
    res.setHeader('Content-Type', 'application/x-mpegURL');
  } else if (fileExtension === '.ts') {
    res.setHeader('Content-Type', 'video/mp2t');
  }

  // Stream the file to the response
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
};
