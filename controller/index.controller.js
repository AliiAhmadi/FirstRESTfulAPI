const db = require("./db");
const Joi = require("joi");
const schema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  repeat_password: Joi.ref("password"),
});

///////////////////////////
function MainHandler(req, res) {
  res.status(200).send("Main Page");
}
function GetAllUsers(req, res) {
  res.status(200).send(db);
}
function GetSingleUser(req, res) {
  const User = FindUserInDB(req.params.UserID);
  if (User) {
    res.status(200).send(User);
  } else {
    res.status(404).send("NOT FOUND");
  }
}
/////////////////////////////

function PostHandler(req, res) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    res.status(400).send("bad request" + validation.error);
  } else {
    db.push({
      id: Math.floor(Math.random() * 1000),
      username: req.body.username,
      password: req.body.password,
    });

    res.status(200).send(db);
  }
}
/////////////////////////////

function PutHandler(req, res) {
  const User = FindUserInDB(req.params.UserID);
  if (User) {
    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(400).send("bad request" + validation.error);
    } else {
      db.splice(db.indexOf(User), 1);
      db.push({
        id: req.params.UserID,
        username: req.body.username,
        password: req.body.password,
      });
      res.status(200).send(db);
    }
  } else {
    res.status(404).send("User NOT FOUND");
  }
}

////////////////////////////
function DeleteHandler(req, res) {
  const User = FindUserInDB(req.params.UserID);

  if (User) {
    db.splice(db.indexOf(User), 1);
    res.status(200).send(db);
  } else {
    res.status(404).send("User NOT FOUND");
  }
}

////////////////////////////////
function FindUserInDB(userID) {
  return db.find((user) => user.id == userID);
}

module.exports = {
  MainHandler,
  GetAllUsers,
  GetSingleUser,
  PostHandler,
  PutHandler,
  DeleteHandler,
};
