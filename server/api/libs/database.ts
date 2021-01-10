import mongoose from "mongoose";

import {config} from "../../config/index";
import logger from "../../utils/logger";

(async function connectToDataBase () {
   try {
    const db = await mongoose.connect(config.mongo.uri,{
        useCreateIndex:true, 
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    logger.info(`Connecto with mongo  ${db.connect.name}`)
   } catch (error) {
    logger.error(`Fail to connect with data base ${error}`) 
   }
})()

