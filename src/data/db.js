const Mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  // create db connection
  connect: () => {
    Mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify:false
    });
    //check if the database is connected
    const connection = Mongoose.connection;
    connection.once("open", () => {
      console.log("Connected to Database Succesfully");
    });
    // check if there was an error connecting to Database
    connection.on("error", (error) => {
      console.log("Error connecting to Database" + error);
    });
  },
};

