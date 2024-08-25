const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./conn/conn"); // Correctly import your connection file

require("./routes/auth");
require("./routes/list");

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the Database
connectDB().catch(err => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Optional: exit the process if MongoDB connection fails
});

// Routes
app.get("/", (req, res) => {
    res.send("hello");
});

app.use("/api/v1", require("./routes/auth"));
app.use("/api/v2", require("./routes/list"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Dynamic Port for deployment
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
