// Error-handling middleware (must have 4 parameters)
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error"
        }
    })
}

const notFoundHandler = (req, res, next) => {
    res.status(404).json({ message: "Route not found" });
};

module.exports = {
    notFoundHandler,
    errorHandler
}