import * as http from 'http';

const server: http.Server = http.createServer((req:  http.IncomingMessage, res:  http.ServerResponse<http.IncomingMessage>) =>
{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello world');
    res.end();
});

// @ts-ignore
server.listen(3000, () => console.log(`server on port ${3000}`));
