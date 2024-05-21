const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a server
const server = http.createServer((req, res) => {
  // Serve index.html for the root URL
  if (req.url === '/') {
    const indexPath = path.join(__dirname, 'client', 'dist', 'index.html');
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (req.url === '/favicon.ico') {
    // Serve favicon.ico
    const faviconPath = path.join(__dirname, 'favicon.ico');
    fs.readFile(faviconPath, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Favicon not found');
      } else {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end(data);
      }
    });
  } else {
    // Serve static files from the 'client/dist' directory
    const filePath = path.join(__dirname, 'client', 'dist', req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('File Not Found');
      } else {
        const contentType = getContentType(filePath);
        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
      }
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to determine the content type based on file extension
function getContentType(filePath) {
  if (filePath === null || filePath === undefined) {
    throw new Error('filePath is null or undefined');
  }
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}

