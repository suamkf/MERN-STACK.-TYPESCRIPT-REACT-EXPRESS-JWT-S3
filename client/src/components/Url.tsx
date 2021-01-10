import React from "react";
import ReactPlayer from "react-player";

type UrlProps = {
  urlVideo: string;
};
export default function Url({ urlVideo }: UrlProps) {
  const url: string = urlVideo;

  return (
    <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={url}
          width='100%'
          height='100%'
        />
      </div>

  
  );
}
