const express = require("express");

const cors = require("cors")
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const PORT = process.env.APP_PORT || 3000; // Use environment variable or default to 3000


// Apply middlewares
app.use(cors())
app.use(helmet());        // Security headers
app.use(morgan("dev"));   // Request logging


// Define a simple route
app.get("/", (req, res) => {
    res.send("Welcome to Deeshu!");
});


// to handle not defined route
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Error-handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error"
        }
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
