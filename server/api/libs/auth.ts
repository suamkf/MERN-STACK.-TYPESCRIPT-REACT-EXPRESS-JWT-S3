import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";

import { config } from "../../config/index";
import { getUserById } from "../resurces/user/user.controller";
import logger from "../../utils/logger";
import { IUser } from "../resurces/user/user.model";


const jwtOptions = {
  secretOrKey: config.jwt.secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const auth = new Strategy(jwtOptions, async (Payload, done) => {
  logger.info("User try to use a proctect route.");
  try {
    const user: IUser = await getUserById(Payload._id);
    if (user) {
      logger.info(`User with username: ${user.username} send a valid token`);

      return done(null, user);
    }
    logger.warn(`User send and invalid token`);
    done(null, false);
  } catch (error) {
    logger.error(`Error ocurried in autn process${error}`);
  }
});
