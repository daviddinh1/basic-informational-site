let http = require("http");
let url = require("url");
let fs = require("fs");
const path = require("path");

//const filePath = path.join("websites", "index.html");

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = "";
    if (q.pathname === "/") {
      filename = "./websites/index.html";
    } else if (q.pathname === "/contact") {
      filename = "." + "/websites" + q.pathname + ".html";
    } else if (q.pathname === "/about") {
      filename = "." + "/websites" + q.pathname + ".html";
    } else {
      filename = "." + "/websites" + "404" + ".html";
    }

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
