const request = require('./request');
let help = false;
let url;
let save;
let method = 'GET';
let getHeader = false;
let postMessage;
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

request(url, method, save, getHeader, postMessage);