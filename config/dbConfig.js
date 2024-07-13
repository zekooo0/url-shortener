const mongoose = require("mongoose");

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_STRING)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Successfully connected to the database");
  });
};
