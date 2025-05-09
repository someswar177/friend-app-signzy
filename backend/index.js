const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;
const cors = require("cors");
require("dotenv").config();

const allowedOrigins = [process.env.CLIENT_URL, process.env.PRODUCTION_URL];
app.use(
    cors({
      origin: ["http://localhost:5173","http://localhost:3000", "https://friend-app-signzy.vercel.app"],
    //   origin: allowedOrigins,
      credentials: true,
    })
);
app.use(express.json());

const connectDB = require("./config/database");

const userRoutes = require("./routes/user");

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.status(200).json("Hello from friend-app-signzy backend server");
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server start http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err.message);
        process.exit(1);
    });