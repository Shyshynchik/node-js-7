import {IncomingMessage, ServerResponse} from "http";

const http = require('http');

const hostname = 'localhost';
const port = 3001;

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

const methodNotAllowed = function (res: ServerResponse) {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end('405 Method Not Allowed!');
    return;
}

const server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
    switch (req.url) {
        case '/get':
            if (req.method !== METHOD_GET) {
                methodNotAllowed(res);
                break;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello, World from GET');
            break;
        case '/post':
            if (req.method !== METHOD_POST) {
                methodNotAllowed(res);
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello, World from POST');
            break;
        default:
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Bad Gateway!');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});