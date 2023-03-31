import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import {registerValidation} from "./validations/auth.js";

import AUTH_UTILS from "./utils/auth.js";
import * as UserController from "./controllers/UserController.js";

const app = express();
const PORT = 3001;

app.use(express.json());

mongoose
    .connect('mongodb+srv://mccorn13:markusha180593@cluster0.syiixd4.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch(err => console.log('DB ERROR!', err));

app.get('/', (req, res) => {
    res.send('He1 o');
})

app.get('/auth/me', AUTH_UTILS.checkAuth, UserController.getMe)

app.post('/auth/login', UserController.login)

app.post('/auth/register', registerValidation, UserController.register)

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log('Server run on port = ' + PORT + ". Status: OK (200)");
  }
})