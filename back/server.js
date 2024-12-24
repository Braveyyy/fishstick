const express = require('express'), http = require('http');
const hostname = 'localhost';
const port = 8080;
const app = express();

app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200; // 200 OK
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body>Test Server</body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server Running at http:${hostname}:${port}/`);
});