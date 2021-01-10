import { model, Schema, Document } from "mongoose";

import { config } from "../../../config/index";


const videoInfo = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: String,
    required: true,
  },
};

export interface IVideo extends Document {
  title: string;
  url: string;
  description: string;
  state: boolean;
  owner: string;
  created_at: string;
  updated_at: string;
}
const videoSchema = new Schema(videoInfo, {
  timestamps: true,
});

export interface IVideoPersist extends Document {
  title: string;
  url: string;
  description: string;
  state: boolean;
  owner: string;
  created_at: string;
  updated_at: string;
  videoId:string;
}
const videoSchemaPersist = new Schema(
  {
    ...videoInfo,
    videoId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model<IVideo>(config.mongo.videoCollectionName, videoSchema);
export const VideoChangesPersist = model<IVideoPersist> (config.mongo.videoCollectionPersistChangesName, videoSchemaPersist)
