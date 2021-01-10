import { model, Schema, Document } from "mongoose";
import {IVideo } from "../video/video.model";

import {config} from "../../../config/index";

export interface IUser extends Document {
   
  username: string;
  email: string;
  password: string;
  state: boolean;
  created_at: string;
  updated_at: string;
  videos: Array<IVideo>
}


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: Boolean,
      default: true,
    },
    videos: [{
      type: Schema.Types.ObjectId,
      ref: config.mongo.videoCollectionName,
    }]
  },
  {
    timestamps: true,
  }
);

export default model<IUser> (config.mongo.userCollectionName,userSchema);