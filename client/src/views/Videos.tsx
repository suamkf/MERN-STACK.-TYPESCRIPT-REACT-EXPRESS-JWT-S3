import React, { useState, useEffect } from "react";
import Axios from "axios";

import { IVideo } from "../components/interfaces";
import Main from "../components/Main";
import VideoComponnent from "../components/Video";

export default function Videos() {
  const [videos, setVideos] = useState<Array<IVideo> | undefined>(undefined);
  async function getVideos() {
    const { data } = await Axios.get("/api/users/videos");

    const videos: Array<IVideo> = data.videos;
  
    setVideos(videos);
  }
  useEffect(() => {
    try {
      getVideos();
    } catch (error) {
      console.log(error);
    }
  }, []);

   return (
    <Main center={true}>
      {videos
        ? videos?.map((video) => <VideoComponnent  key={video._id} video={video} owner={true} getVideos={getVideos} />)
        : ""}
    </Main>
  );
}
