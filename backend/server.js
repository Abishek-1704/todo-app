const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Todo API is Running...");
});

app.use("/todos", todoRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});