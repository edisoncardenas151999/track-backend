require("./models/User");
require("./models/Track");
const requireAuth = require("./middlewares/requireAuth");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get("/", requireAuth, (req, res) => {
  res.send(`your email: ${req.user.email}`);
});

const mongoURI =
  "mongodb+srv://edison:edison@cluster0.1myp3os.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error(err), "err";
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
