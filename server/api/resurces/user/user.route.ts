import { Router, Response, Request } from "express";
import passport from "passport";

import {
  valideteUserInfo,
  checkUserAvailableInDB,
  convertToLowerCase,
  checkUSerRegister,
} from "./user.validate";
import {
  saveUser,
  hideCriticalInformation,
  createToken,
  validatePassword,
  getUserByUsernameAndEmail,
  getUserById,
} from "./user.controller";
import { errorHandler } from "../../libs/errorHandler";
import logger from "../../../utils/logger";
import { IVideo } from "../video/video.model";
import { getUserVideos } from "../video/video.controller";
import UserError from "./user.error";
import {IUser} from "./user.model";

const userRouter = Router();
const jwtAuth = passport.authenticate("jwt", { session: false });

userRouter.post(
  "/singup",
  [valideteUserInfo, checkUserAvailableInDB],
  errorHandler(async (req: Request, res: Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    logger.info("User passed validation and will be create");
    const user = await saveUser(username, email, password);
    logger.info(
      `User witn username: ${user.username} was create successfully.`
    );
    const token = createToken(user._id);
    const userWithSafeInfo = hideCriticalInformation(user);
    logger.info(
      `USer create successfully user: ${userWithSafeInfo}, and token: ${token}`
    );
    return res.status(201).json({
      user: userWithSafeInfo,
      token,
    });
  })
);

userRouter.post(
  "/login",
  [convertToLowerCase, checkUSerRegister],
  errorHandler(async (req: Request, res: Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const users = await getUserByUsernameAndEmail(username, email);
    if (validatePassword(users[0], password)) {
      logger.info(
        `User with username:${users[0].username} send a valid password`
      );
      const token = createToken(users[0]._id);
      const userWithSafeInfo = hideCriticalInformation(users[0]);
      logger.info(
        `USer create token successfully user: ${userWithSafeInfo}, and token: ${token}`
      );
      return res.status(201).json({
        user: userWithSafeInfo,
        token,
      });
    } else {
      logger.warn(
        `User with username${users[0].username} send a wrong password`
      );
      throw new UserError(
        "`Invalid password, please check and try again.",
        "User Error"
      );
    }
  })
);

userRouter.get(
  "/videos",
  [jwtAuth],
  errorHandler(async (req: Request, res: Response) => {
    logger.info(
      `User with username: ${req.user?.username} requests all her videos`
    );
    const videos: Array<IVideo> = await getUserVideos(req.user?.username);
    if (videos.length > 0) {
      logger.info(
        `User with username: ${req.user?.username} have ${videos.length} videos`
      );
      return res.status(200).json({
        videos,
      });
    }
    throw new UserError("User not have videos yet", "User Error");
  })
);

userRouter.get("/whoami" , [jwtAuth],errorHandler(async(req:Request, res: Response)=>{
   logger.info(`user from req: ${req.user?._id}`)
    const user:IUser = await getUserById(req.user?._id);
    logger.info(`User with need her information at rouet /whoami ${user}`);

    return res.status(200).json({
      user,
    })
}))



export default userRouter;
