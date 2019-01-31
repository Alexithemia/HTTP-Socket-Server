const request = require('./request');
let help = false;
let url;
let save;
let method = 'GET';
let getHeader = false;
let postMessage;
const options = {
  '-X': 'changes method, next argument must be POST, PUT, DELETE, HEAD, or OPTIONS. GET is default',
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

for (let i = 2; i < process.argv.length; i++) {
  if (options[process.argv[i]]) {
    if (process.argv[i] === '-X') {
      if (!methods[process.argv[i + 1]]) {
        console.log("[31mA request method must follow -X[39m");
        process.exit(1);
      }
      method = process.argv[i + 1];
      i++;
      if (method === 'POST') {
        if (options[process.argv[i + 1]]) {
          console.log("[31mPlease include a body for your POST request[39m");
          process.exit(1);
        }
        postMessage = process.argv[i + 1];
        i++;
      }
    } else if (process.argv[i] === '-save') {
      if (options[process.argv[i + 1]]) {
        console.log("[31mPlease include a specifed filename to be saved to, ex: 'savethisthing.html'[39m");
        process.exit(1);
      }
      save = process.argv[i + 1];
      i++;
    } else if (process.argv[i] === '-h') {
      help = true;
    } else if (process.argv[i] === '-H') {
      getHeader = true;
    }
  } else {
    url = process.argv[i];
  }
}

if (help || process.argv.length === 2) {
  console.log('List of argument values recognized by client.js');
  for (const key in options) {
    console.log(key + ' - ' + options[key]);
  }
  console.log("Url must be last, can include a designated port on the end, ex: 'url.com:8080'");
  process.exit(1);
}

if (!url || options[url] || url === postMessage) {
  if (method === 'POST') {
    console.log("[31mYou either did not include a message for the POST request or did not include a url at the end[39m");
    process.exit(1);
  }
  console.log("[31mPlease include a url, ex: 'node client.js iwanttogethere.com,' url must be last[39m");
  process.exit(1);
}

request(url, method, save, getHeader, postMessage);