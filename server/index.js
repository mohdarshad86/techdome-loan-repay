const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();
const cors = require('cors');
require('dotenv').config();
mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", route);

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
