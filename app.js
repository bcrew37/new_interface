const express = require("express");
const hbs = require("hbs");
const app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/src/partials");
app.set("views", __dirname + "/src/partials");

app.use("/", express.static(__dirname + "/src"));
app.get("/", (req, res) => {
    res.render("files")
})

app.listen(3000, () => {
    console.log("Server has been started...");
});
