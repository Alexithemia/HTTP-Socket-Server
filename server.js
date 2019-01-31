const net = require('net');
const fs = require('fs');

const server = net.createServer((socket) => {
  socket.setEncoding('utf8');
  socket.on('data', (data) => {

    const dataArr = data.toString().split('\n');
    const requestLine = dataArr[0].split(' ');
    const path = requestLine[1];

    switch (path) {
      case '':
      case '/':
      case '/index':
      case '/index.html':
        fs.readFile('./public/index.html', function (e, data) {
          if (e) { throw e };
          writeHeader(socket, '200 OK', 'text/html', data.toString())
          socket.end();
        });
        break;
      case '/hydrogen':
      case '/hydrogen.html':
        fs.readFile('./public/hydrogen.html', function (e, data) {
          if (e) { throw e };
          writeHeader(socket, '200 OK', 'text/html', data.toString());
          socket.end();
        });
        break;
      case '/helium':
      case '/helium.html':
        fs.readFile('./public/helium.html', function (e, data) {
          if (e) { throw e };
          writeHeader(socket, '200 OK', 'text/html', data.toString());
          socket.end();
        });
        break;
      case '/css/styles.css':
        fs.readFile('./public/css/style.css', function (e, data) {
          if (e) { throw e };
          writeHeader(socket, '200 OK', 'text/html', data.toString());
          socket.end();
        });
        break;
      default:
        fs.readFile('./public/404.html', function (e, data) {
          if (e) { throw e };
          writeHeader(socket, '200 OK', 'text/html', data.toString());
          socket.end();
        });
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