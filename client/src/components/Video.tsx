import { IUser, IVideo } from "./interfaces";
import Main from "../components/Main";
import Avatar from "../components/Avatar";
import { useEffect, useState } from "react";
import Url from "../components/Url";
import DeleteUpdateButton from "./DeleteUpdateButton";

type videosProps = {
  video: IVideo;
  owner: boolean;
  getVideos: Function;
};
export default function VideoComponnent({
  video,
  owner,
  getVideos,
}: videosProps) {
  return (
    <div className="Post-Componente">
      <Avatar user={video.owner} title={video.title} />
      <Url urlVideo={video.url}/>
      {owner ? (
        <DeleteUpdateButton getVideos={getVideos} videoId={video._id} />
      ) : (
        ""
      )}
    </div>
  );
}
