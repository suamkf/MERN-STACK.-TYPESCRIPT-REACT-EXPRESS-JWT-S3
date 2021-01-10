import app from "./app";
import logger from "./utils/logger"
import {config} from "./config/index";


export default app.listen(config.server.port, ()=>{
  logger.info(`Server running on port ${config.server.port}`);
})