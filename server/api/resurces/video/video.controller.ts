import Video, {
  IVideo,
  IVideoPersist,
  VideoChangesPersist,
} from "./video.model";

import logger from "../../../utils/logger";

declare global {
  namespace Express {
    interface User {
      username?: string;
      _id?: string;
    }
  }
}


export const saveVideo = async (
  title: string,
  url: string,
  description: string,
  owner: any
) => {
  logger.info(`User with id: ${owner} try to save a video: ${url}`);
  const video = await new Video({
    title,
    url,
    description,
    owner,
  }).save();
  await new VideoChangesPersist({
    title: video.title,
    url: video.url,
    description: video.description,
    owner: video.owner,
    videoId: video._id,
  }).save();
  return video;
};

export const getAllVideos = () => {
  logger.info("User geted all videos");
  return Video.find({ state: true })
  .sort({ createdAt: -1 });
};

export const getVideoById = (_id: string, username: string | undefined) => {
  logger.info(`User with username:${username} want video with id:${_id}`);
  return Video.findOne({
    $and: [{ _id }, { state: true }],
  });
};
export const getUserVideos = (owner: string | undefined) => {
  return Video.find({
    $and: [{ owner }, { state: true }],
  })
  .sort({ createdAt: -1 });
};

export const deleteVideo = async (_id: string | undefined) => {
  const videoDelete: IVideo = await Video.findByIdAndUpdate(
    { _id },
    { state: false },
    { new: true }
  );
  await new VideoChangesPersist({
    title: videoDelete.title,
    url: videoDelete.url,
    description: videoDelete.description,
    owner: videoDelete.owner,
    videoId: videoDelete._id,
  }).save();
  return videoDelete;
};
export const updateVideo = async (
  _id: string | undefined,
  _title: string | undefined,
  _url: string | undefined,
  _description: string | undefined
) => {
  const videoUpdate: IVideo = await Video.findByIdAndUpdate(
    { _id },
    { title: _title, url: _url, description: _description },
    { new: true }
  );
  await new VideoChangesPersist({
    title: videoUpdate.title,
    url: videoUpdate.url,
    description: videoUpdate.description,
    owner: videoUpdate.owner,
    videoId: videoUpdate._id,
  }).save();
  return videoUpdate;
};
