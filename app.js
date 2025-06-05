const express = require("express");

const app = express();
const PORT = process.env.APP_PORT || 3000; // Use environment variable or default to 3000

// Define a simple route
app.get("/", (req, res) => {
    res.send("Welcome to Deeshu!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
