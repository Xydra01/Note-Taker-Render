// DEPENDENCIES
const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT;

// DATA
const noteData = require("./db/db.json");
const app = express();

// MIDDLEWARE

// ROUTES

app.get("/api/notes", (req, res) => {});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
