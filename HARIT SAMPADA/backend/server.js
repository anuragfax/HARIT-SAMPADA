const http = require('http');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const frontendRoot = path.join(projectRoot, 'frontend');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
    let requestPath;
    try {
        requestPath = decodeURIComponent(req.url.split('?')[0]);
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('400 Bad Request');
        return;
    }

    const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
    const sharedPath = /^(api|database)([\\/]|$)/.test(relativePath);
    const filePath = path.resolve(sharedPath ? projectRoot : frontendRoot, relativePath);
    const allowedRoot = sharedPath ? projectRoot : frontendRoot;

    if (filePath !== allowedRoot && !filePath.startsWith(`${allowedRoot}${path.sep}`)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Error: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = Number(process.env.PORT || 8080);
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
