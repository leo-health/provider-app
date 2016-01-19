const https = require("https");
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(function(options, (request, response) {
	response.writeHead(200);
}).listen(3000);
