const mongoose = require("mongoose");
const initData = require("./data.js");
const Recipe = require("../server/models/Recipe.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/RecipeBolg";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Recipe.deleteMany({});
  await Recipe.insertMany(initData.Data);
  console.log("data was initialized");
};

initDB();