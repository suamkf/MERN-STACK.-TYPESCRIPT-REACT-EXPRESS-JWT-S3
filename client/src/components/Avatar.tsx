import React from "react";

type AvatarProps = {
  user: string | undefined;
  title: string;
};
export default function Avatar({ user, title }: AvatarProps) {
  return (
    <>
      
        <div className="Avatar">
            <div>
            <p className="avatar__titile">&nbsp;&nbsp;&nbsp;{`${title} `} </p>
            </div>
         

          <div className="owner__video">
          <h2 className="avatar__titile">{`Posted by: ${user}`}</h2>
        </div>
        </div>
        
      
    </>
  );
}
