const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/contacts", require("./routes/contacts"));

// ✅ ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ❗ Mongo connect (example)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
