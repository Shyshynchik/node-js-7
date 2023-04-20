import {IncomingMessage, ServerResponse} from "http";

const http = require('http');

const hostname = '172.27.0.2';
const port = 3000;

const METHOD_GET = 'GET';
const REDIRECT_URL = 'http://localhost:3001/get'

const server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
    if (req.method == METHOD_GET && req.url == '/get') {
        http.get(REDIRECT_URL, (response: IncomingMessage) => {
            if (response.statusCode === undefined) {
                res.statusCode = 400;
            } else {
                res.statusCode = response.statusCode;
            }

            res.setHeader('Content-Type', 'text/plain');


            response.on('data', (data: any) => {
                res.end(data.toString());
            });
            return;
        }).on('error', (error: Error) => {
            console.error(error);
        });
        return;
    }

    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Gateway!');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});