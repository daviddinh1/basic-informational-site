const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// Define the path for the HTML files directory
const baseDir = path.join(__dirname, "public");

// Map paths to their corresponding HTML files
const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

// Create the server
http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const route = routes[parsedUrl.pathname] || "404.html";
    const filePath = path.join(baseDir, route);

    // Read the HTML file and serve it
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("500 Server Error");
      } else {
        // Set Content-Type and respond
        res.writeHead(route === "404.html" ? 404 : 200, {
          "Content-Type": "text/html",
        });
        res.end(data);
      }
    });
  })
  .listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
  });
