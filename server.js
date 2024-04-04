const http = require("http");
const app = require("./app.js");
const mongoose = require("mongoose");
const MONGO_URL = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.liy2xar.mongodb.net/?retryWrites=true&w=majority`;



const port = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("db connected!!!!!!!!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  server.listen(port, () => {
    console.log(`listening to port ${port}.....`);
  });
}

startServer();