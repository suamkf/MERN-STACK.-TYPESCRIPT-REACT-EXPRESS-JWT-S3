import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User, { IUser } from "./user.model";
import { config } from "../../../config/index";
import logger from "../../../utils/logger";

function hashPassword(password: string) {
  logger.info("Hasing passwrod");
  const hashedPassword: string = bcrypt.hashSync(
    password,
    parseInt(config.bcrypt.saltOrRouds)
  );
  return hashedPassword;
}
export const getUserByUsernameAndEmail = (
  username: string | undefined,
  email: string | undefined
): Array<IUser> => {
  console.log(username, email);
  return User.find({
    $and: [{ $or: [{ username }, { email }] }, { state: true }],
  });
};

export const saveUser = (username: string, email: string, password: string) => {
  return new User({
    username,
    email,
    password: hashPassword(password),
  }).save();
};

export const hideCriticalInformation = (user: IUser) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
  };
};

export const createToken = (_id: string) => {
  logger.info("Creating token");
  const token = jwt.sign({ _id }, config.jwt.secretOrKey, {
    expiresIn: config.jwt.expiresIn,
  });
  logger.info(`token created successfully ${token}`);
  return token;
};

export const getUserById = (_id: string | undefined) => {
  return User.findOne({
    $and: [{ _id }, { state: true }],
  });
};

export const validatePassword = (user: IUser, password: string) => {
  logger.info("Compare password with database");
  return bcrypt.compareSync(password, user.password);
};
