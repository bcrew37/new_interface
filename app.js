const express = require("express");
const hbs = require("hbs");
const app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/src/partials");
app.set("views", __dirname + "/src/partials");

app.use("", express.static(__dirname + "/src"));

// Urls + Render
app.use("/", (req, res) => {
    res.render("index", {
        scripts: []
    })
})

app.listen(8080, () => {
    console.log("Server has been started...");
});
