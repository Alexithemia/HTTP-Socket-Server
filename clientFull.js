const net = require('net');
const fs = require('fs');
const options = {
  GET: 'Default Method',
  POST: 'Changes request method to POST',
  PUT: 'Changes request method to PUT',
  DELETE: 'Changes request method to DELETE',
  HEAD: 'Changes request method to HEAD',
  OPTIONS: 'Changes request method to OPTIONS',
  '-save': 'Saves body of response to file in saves folder, filename may be defined as next argument value, specify extension or will be saved as .txt',
  '-H': 'Sets client to display header of response',
  '-h': 'Requests this help list'
}
const methods = {
  GET: true,
  POST: true,
  PUT: true,
  DELETE: true,
  HEAD: true,
  OPTIONS: true
}
const err = {
  '400': '[31mThe server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing)[39m',
  '401': '[31mThe request was valid, but the server is refusing action. Authentication is required and has failed or has not yet been provided[39m',
  '403': '[31mThe request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort[39m',
  '404': '[31mThe requested resource could not be found but may be available in the future[39m',
  '405': '[31mRequest method is not supported for the requested resource[39m',
  '410': '[31mResource requested is no longer available and will not be available again[39m',
  '451': '[31mServer operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource[39m',
  '500': '[31mUnknown server error occured[39m',
  '502': '[31mThe server was acting as a gateway or proxy and received an invalid response from the upstream server[39m',
  '503': '[31mThe server is currently unavailable[39m',
  '504': '[31mThe server was acting as a gateway or proxy and did not receive a timely response from the upstream server[39m',
  '505': '[31mThe server does not support the HTTP protocol version used in the request[39m'
}
let method = 'GET';
let url;
let port = '80';
let response = '';
let host;
let path;
let save;
let help = false;
let getHeader = false;
let postMessage;
let headerHash = {};

for (let i = 2; i < process.argv.length; i++) {
  if (options[process.argv[i]]) {
    if (methods[process.argv[i]]) {
      method = process.argv[i];
      if (method === 'POST') {
        if (options[process.argv[i + 1]]) {
          console.log("[31mPlease include a body for your POST request[39m");
          process.exit(1);
        }
        postMessage = process.argv[i + 1];
      }
    } else if (process.argv[i] === '-save') {
      if (options[process.argv[i + 1]]) {
        console.log("[31mPlease include a specifed filename to be saved to, ex: 'savethisthing.html'[39m");
        process.exit(1);
      }
      save = process.argv[i + 1];
    } else if (process.argv[i] === '-h') {
      help = true;
    } else if (process.argv[i] === '-H') {
      getHeader = true;
    }
  } else {
    url = process.argv[i];
  }
}

if (help) {
  console.log('List of argument values recognized by client.js');
  for (const key in options) {
    console.log(key + ' - ' + options[key]);
  }
  console.log("Url must be last, can include a designated port on the end, ex: 'url.com:8080'");
  process.exit(1);
}

if (!url || options[url] || url === postMessage) {
  console.log("[31mPlease include a url, ex: 'node client.js iwanttogethere.com'[39m");
  process.exit(1);
}
if (url.indexOf(':') > -1) {
  port = url.split(':')[1];
  url = url.split(':')[0];
}

if (url.indexOf('/') > -1) {
  host = url.slice(0, url.indexOf('/'));
  path = url.slice(url.indexOf('/'));
} else {
  host = url;
  path = '/';
}

const client = net.connect(port, host, function () {
  console.log('connected to ' + host + ':' + port);
});

let request = method + ' ' + path + ' HTTP/1.1\n';
request += 'Date: ' + new Date().toUTCString() + '\n';
request += 'Host: ' + host + '\n';
request += 'User-Agent: TylerClient\n';
if (method === 'POST') {
  request += 'Content-Length: ' + postMessage.length + '\n';
  request += 'Connection: close\n\n';
  request += postMessage
} else {
  request += 'Connection: close\n\n';
}
client.write(request);

client.on('data', function (data) {
  response += data.toString();
})

client.on('error', (error) => {
  console.log(error);
});

client.on('end', function () {
  if (!(response.slice(0, 4) === 'HTTP')) {
    console.log('[31mResponse is not valid HTTP[39m');
    return;
  }
  let tempArr = response.split('\r\n\r\n');
  let header = tempArr[0];
  let status = header.split(' ')[1];
  let body = tempArr[1];

  if (save) {
    fs.writeFile("saves/" + save, body, function (error) {
      if (error) {
        throw error;
      }
      console.log('Saved!');
    });
  }

  let headerLines = header.split('\n');
  headerLines.shift()
  headerLines.forEach(line => {
    let headerData = line.split(': ')
    headerHash[headerData[0]] = headerData[1];
  });

  if (getHeader) {
    console.log(header);
  } else {
    console.log(body);
    if (err[status]) {
      console.log('Error ' + status + ' ' + err[status]);
    }
  }
})
