import {IncomingMessage, ServerResponse} from "http";

const http = require('http');

const hostname = 'localhost';
const port = 3001;

const METHOD_GET = 'GET';

const server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
    if (req.method == METHOD_GET && req.url == '/get') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!');
        return;
    }

    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Gateway!');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});