const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const DATA_FILE_PATH = path.join(__dirname, "assets", "celebrities.json");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/users", (req, res) => {
  fs.readFile(DATA_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Unable to read data file" });
    }
    res.send(JSON.parse(data));
  });
});

app.post("/api/users/update", (req, res) => {
  const updatedUsers = req.body;
  fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedUsers, null, 2), (err) => {
    if (err) {
      return res.status(500).send({ error: "Unable to update data file" });
    }
    res.send({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
