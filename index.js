const app = require("express")();

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));
app.listen(3000, "0.0.0.0", () => console.log("server started"));