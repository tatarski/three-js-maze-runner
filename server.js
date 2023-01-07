let express = require("express");
let app = express();
let path = require("path");
let port = 3000;

app.use(
    "/public",
    express.static(path.join(__dirname, "public"))
);

app.get("/", function (req, res) {
    let file_name = path.join(__dirname, "./public/start.html");
    res.sendFile(file_name);
});

app.listen(port, function () {
    console.log("Listening on port: " + port);
});