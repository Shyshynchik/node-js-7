import {IncomingMessage, ServerResponse} from "http";

const http = require('http');

const hostname = '172.27.0.2';
const port = 3000;

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const REDIRECT_URL = 'http://localhost:3001'

const REDIRECT_HOST = 'localhost';
const REDIRECT_PORT = 3001;

const methodNotAllowed = function (res: ServerResponse) {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end('405 Method Not Allowed!');
}

const handleResponse = function (res: ServerResponse, response: IncomingMessage) {
    if (response.statusCode === undefined) {
        res.statusCode = 400;
    } else {
        res.statusCode = response.statusCode;
    }

    res.setHeader('Content-Type', 'text/plain');


    response.on('data', (data: any) => {
        res.end(data.toString());
    });
}

const server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
    switch (req.url) {
        case '/get':
            if (req.method !== METHOD_GET) {
                methodNotAllowed(res);
                break;
            }
            http.get(REDIRECT_URL + req.url, (response: IncomingMessage) => {
                handleResponse(res, response);
                return;
            }).on('error', (error: Error) => {
                console.error(error);
            });
            break;
        case '/post':
            if (req.method !== METHOD_POST) {
                methodNotAllowed(res);
                break;
            }

            const postOptions = {
                host: REDIRECT_HOST,
                port: REDIRECT_PORT,
                path: '/post',
                method: METHOD_POST,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': 0
                }
            };

            const response = http.request(postOptions, (_res: any) => {
                let message = '';

                _res.on('data', (chunk: any) => {
                    message += chunk;
                });

                _res.on('end', () => {
                    res.statusCode = _res.statusCode;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(message);
                });
            });

            response.end();
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