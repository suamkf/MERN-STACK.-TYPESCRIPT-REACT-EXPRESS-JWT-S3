import React, { useState, useEffect } from "react";
import Axios from "axios";

import { IVideo } from "../components/interfaces";
import Main from "../components/Main";
import VideoComponnent from "../components/Video";

export default function Videos2() {
  const [videos, setVideos] = useState<Array<IVideo> | undefined>(undefined);

  useEffect(() => {
    (async function getVideos() {
      try {
        const { data } = await Axios.get(`/api/videos/`);
        const videos: Array<IVideo> = data.videos;
      
        setVideos(videos);
      } catch (error) {
        return <></>;
      }
    })();
  }, []);
 
  function voidFunction (){
      
  }

  return (
    <Main center={true}>
      {videos ? videos?.map((video) => <VideoComponnent key={video._id} video={video} owner={false} getVideos={voidFunction}/>) : ""}
    </Main>
  );
}
