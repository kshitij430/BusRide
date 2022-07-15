// CORE MODULES
const mongoose = require("mongoose");

// THIRD PARTY MODULES
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config.env") });

// MY OWN MODULES
const app = require(path.join(__dirname, "app.js"));

// DATABASE CONNECT
const dbUrl =
  `mongodb+srv://kshitijg5:<password>@cluster0.rhnqz.mongodb.net/Bus-Ride?retryWrites=true&w=majority`.replace(
    "<password>",
    process.env.DB_PASSWORD
  );
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DATABASE SUCCESSFULLY CONNECTED!!");
  })
  .catch((err) => {
    console.log(err, "ERROR CONNECTING TO THE DATABASE");
  });

// LISTEN TO THE SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log(`SERVER IS LISTENING TO THE INCOMING REQUESTS!`);
});
