import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import UserModel from "../models/User.js";
import * as utils from "../utils/common.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    } else {
      const password = req.body.password;
      const key = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, key);

      const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,
      });

      const user = await doc.save();

      const token = jwt.sign({ _id: user._id }, utils.getSecretKey(), { expiresIn: "30d" });

      res.json({ ...utils.getUserData.call(user), token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(utils.getErrorResponse("error_register", err))
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json(utils.getErrorResponse('error_auth_user'))
    } else {
      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

      if (isValidPass) {
        const token = jwt.sign({ _id: user._id }, utils.getSecretKey(), { expiresIn: "30d" });

        res.json({ ...getUserData.call(user), token });
      } else {
        return res.status(400).json(utils.getErrorResponse('error_auth_login_or_password'))
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(utils.getErrorResponse("error_auth_server", err))
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userID);

    if (user) {
      res.json(getUserData.call(user))
    } else {
      res.status(404).json(getErrorResponse("error_auth_me"));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(getErrorResponse("error_auth_me_server", err))
  }
}

function getUserData() {
  let { passwordHash, ...userData } = this._doc

  return userData
}

function getUserNameByEmail() {
  return "Any Full Name";
}
