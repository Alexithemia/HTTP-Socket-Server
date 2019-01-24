const net = require('net');
const fs = require('fs');

function fetchHtmlFiles(filePath) {
  return fs.readFileSync(filePath);
}

const indexHTML = fetchHtmlFiles('./public/index.html');
const hydrogenHTML = fetchHtmlFiles('./public/hydrogen.html');
const heliumHTML = fetchHtmlFiles('./public/helium.html');
const cssStyles = fetchHtmlFiles('./public/css/styles.css');
const error404 = fetchHtmlFiles('./public/404.html');

const server = net.createServer((socket) => {
  socket.setEncoding('utf8');
  socket.on('data', (data) => {

    const dataArr = data.toString().split('\n');
    const requestLine = dataArr[0].split(' ');
    const path = requestLine[1];

    switch (path) {
      case '/':
      case '/index':
      case '/index.html':
        writeHeader(socket, '200 OK', 'text/html', indexHTML);
        socket.end();
        break;
      case '/hydrogen':
      case '/hydrogen.html':
        writeHeader(socket, '200 OK', 'text/html', hydrogenHTML);
        socket.end();
        break;
      case '/helium':
      case '/helium.html':
        writeHeader(socket, '200 OK', 'text/html', heliumHTML);
        socket.end();
        break;
      case '/css/styles.css':
        writeHeader(socket, '200 OK', 'text/html', cssStyles);
        socket.end();
        break;
      default:
        writeHeader(socket, '404 NOT FOUND', 'text/html', error404);
        socket.end();
        break;
    }
  });
})
  .on('error', (err) => {
    console.log(err);
  });

const writeHeader = (socket, status, fileType, file) => {

  let message = 'HTTP/1.1 ' + status + '\n'
  message += 'Server: Tyler\'s Element Server\n';
  message += 'Date: ' + new Date().toUTCString() + '\n';
  message += 'Content-Type: ' + fileType + '; charset=utf-8\n';
  message += 'Content-Length: ' + file.length + '\n';
  message += 'Connection: keep-alive\n\n';
  message += file;

  socket.write(message);
};

server.listen(8080, () => {
  console.log('Server is UP');
});