import { Document } from "mongoose"

export interface IUser extends Document {
   
    username: string;
    email: string;
    password: string;
    state: boolean;
    created_at: string;
    updated_at: string;
    videos: Array<IVideo>
  }

  export interface IVideo extends Document {
    title: string;
    url: string;
    description: string;
    state: boolean;
    owner: string;
    created_at: string;
    updated_at: string;
  }