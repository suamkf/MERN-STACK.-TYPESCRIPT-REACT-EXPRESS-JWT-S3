import React, { useState,useEffect } from "react";
import Axios from "axios";
import {  useHistory, useParams } from "react-router-dom";

import Main from "../components/Main";
import logger from "../utils/logger";
import VideoClass from "../components/VideoClass";
import { IVideo } from "../components/interfaces";

interface Params {id: string; }

type UploadProps ={
  
  
  upload: boolean;
 
  
}


export default function Upload({upload}:UploadProps) {
  
  const [video, setVideo] = useState<VideoClass>({
    title: "",
    url: "",
    description: "",
  });
  const params = useParams<Params>();
  useEffect(()=>{
    
    if (!upload){
      (async function chargaDataVideo (){
       
 
       
       const {data} = await  Axios.get(`/api/videos/${params.id}`)
       const video:IVideo = data.video;
       setVideo({
         title: video.title,
         url: video.url,
         description: video.description,
       })
     })()
    }
  },[])
  
  

  let historys = useHistory();
  function redirect (path:string){
    historys.push(path)
  }
  function getVideoData(e: any) {
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    });
  }

  async function sendDataToServer(e: any) {
    e.preventDefault();

    try {
      if(upload){
        await Axios.post("api/videos/add", {
          ...video,
        });
      }else{
        
      //Axios.defaults.baseURL="http://localhost:4000"
        await Axios.put(`api/videos/${params.id}`, {
          ...video,
        });
      }
    
      
     redirect("/")
     
    } catch (err) {
      logger.error(err);
    }
  }

  return (
    <Main center={true}>
    
      <div className="Signup">
        <div className="FormContainer">
          <h1 className="Form__titulo">{upload ? ("New Video") : ("Update Video") }</h1>
          <p className="FormContainer__info">
            Complet the fields and upload your video.
          </p>
          <form onSubmit={sendDataToServer}>
            <input
              type="tyext"
              name="title"
              placeholder="Video title"
              className="Form__field"
              required
              onChange={getVideoData}
              value={video.title}
            />

            <input
              type="text"
              name="url"
              placeholder="Video Url"
              className="Form__field"
              required
              onChange={getVideoData}
              value={video.url}
            />
            <input
              type="text"
              name="description"
              placeholder="Video description"
              className="Form__field"
              required
              onChange={getVideoData}
              value={video.description}
            />
            <button className="Form__submit" type="submit">
              {upload ? ("Save new video") : ("Save video changes")}
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
}
