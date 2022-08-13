const express = require("express");
const controller = require("../controller/index.controller");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.get("/", controller.MainHandler);
app.get("/users", controller.GetAllUsers);
app.get("/users/:UserID", controller.GetSingleUser);
app.post("/users", controller.PostHandler);
app.put("/users/:UserID", controller.PutHandler);
app.delete("/users/:UserID", controller.DeleteHandler);
app.listen(PORT, () => {
  console.log("listen ...");
});
