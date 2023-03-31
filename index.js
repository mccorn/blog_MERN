import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import {registerValidation} from "./validations/auth.js";
import UserModel from "./models/User.js";

const app = express();
const PORT = 3001;

app.use(express.json());

mongoose
    .connect('mongodb+srv://mccorn13:markusha180593@cluster0.syiixd4.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch(err => console.log('DB ERROR!', err));

app.get('/', (req, res) => {
    res.send('He1 o');
})

// Просто для тестов
app.post('/auth/login', (req, res) => {
  console.log('post:: /auth/login', req.body);

  const token = jwt.sign({
    email: req.body.email,
    fullName: getUserNameByEmail(req.body.email),
  }, getSecretKey())

  res.json({
    success: true,
    token,
  });
})

app.post('/auth/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  } else {
    const password = req.body.password;
    const key = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, key);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: passwordHash,
    });

    res.json(getResponse('register'))
  }
})

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log('Server run on port = ' + PORT + ". Status: OK (200)");
  }
})

function getResponse(type, config = {success: true}) {
  return Object.assign({ type }, config)
}

function getSecretKey() {
  return (Math.random() * 100000).toString();
}

function getUserNameByEmail() {
  return "Any Full Name";
}