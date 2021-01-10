import {Link} from "react-router-dom"
import Axios from "axios";

type DeleteUpdateButtonProp = {
    getVideos: Function ,
    videoId:string,
}
export default function DeleteUpdateButton({getVideos, videoId}:DeleteUpdateButtonProp){
   

       async function deleteVideo(e:any){
            e.preventDefault();

            await Axios.delete(`/api/videos/${videoId}`);
            getVideos();
        }
        const path:string = `/${videoId}`
    return(
        <ul className="Nav__links">
        <li className="Nav__link-margin-left"><button ><Link to={path}>Update video</Link> </button></li>
        <li className="Nav__link-margin-left"><button onClick={deleteVideo}><Link to="">Delete video</Link></button></li>
        </ul>
    )
}