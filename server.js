const http = require('http');
const request = require('request');
require('dotenv').config();

const clientId = "b999438ff44259cd90c7";
const secretKey = "7ca2488a3217fd93e54473f3c26508ba7b5beb89"

console.log('started server on port 5000');

http.createServer((req, res) => {
    var code = req.url.split("=")[1];
    if (code) {
        request.post('https://github.com/login/oauth/access_token', {
            form: {
                client_id: clientId,
                client_secret: secretKey,
                code: code
            }
        }, (err, r, body) => {
            res.writeHead(301, {
                'Location': 'http://localhost:3000?' + body
            });
            res.end();
        })

    } else {
        res.writeHead(404);
        res.end();
    }
}).listen(5000);