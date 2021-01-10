import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import passport from "passport";
import cors from "cors";

import "./api/libs/database";
import logger from "./utils/logger";
import userRouter from "./api/resurces/user/user.route";
import { auth } from "./api/libs/auth";
import { config } from "./config/index";
import { prodError,devError,mongoErrors } from "./api/libs/errorHandler";
import videoRouter from "./api/resurces/video/video.router";

passport.use(auth);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan("short", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.use(passport.initialize());
app.use("/api/users", userRouter);
app.use("/api/videos" , videoRouter);
app.use(mongoErrors);
if(config.env ==="prod"){
    app.use(prodError);
}else{
    app.use(devError);
}

export default app;
