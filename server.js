// DEPENDENCIES
const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT;

// DATA
const noteData = require("./db/db.json");
const app = express();

// MIDDLEWARE

// ROUTES

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read note data" });
    }

    let notes;
    try {
      notes = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: "Failed to parse note data" });
    }

    res.json(notes);
  });
});

app.post("/api/notes", (req, res) => {});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
