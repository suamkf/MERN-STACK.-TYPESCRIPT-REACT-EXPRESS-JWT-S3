import { devConfig } from "./devConfig";
import { prodConfig } from "./prodConfg";

export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  winston: {
    dirname: `${__dirname}../`,
    filename: "log.log",
    maxFiles: 5,
    maxsize: 512000,
  },
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost/mernStackVideoList",
    userCollectionName: "user",
    videoCollectionName: "video",
    videoCollectionPersistChangesName:"videoChangesPersist"
  },
  bcrypt: {
    saltOrRouds: process.env.SALT_OR_RAUNDS || "10",
  },
  env: process.env.ENV || "dev",
  jwt: {
    secretOrKey: "",
    expiresIn: "24h",
  },
};

switch (config.env) {
  case "prod":
    config.jwt = {
      ...config.jwt,
      ...prodConfig.jwt,
    };
    break;

  default:
    config.jwt = {
      ...config.jwt,
      ...devConfig.jwt,
    };
    break;
}
