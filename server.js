// DEPENDENCIES
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT;

// DATA
const noteData = require("./db/db.json");
const app = express();

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
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

    res.sendFile(path.join(__dirname, "notes.html"));
  });
});

app.post("/notes", (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: "Title and text are required" });
  }

  const newNote = {
    id: uuidv4(),
    title,
    text,
  };

  noteData.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save note" });
    }

    res.status(201).json(newNote);

    res.sendFile(path.join(__dirname, "notes.html"));
  });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
