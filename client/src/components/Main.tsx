import React from 'react'

type MainProps = {
    children: any | undefined,
    center: boolean | undefined
  } 
export default function	Main({ children, center }:MainProps){

	//let classes= `Main ${center ? 'Main--center' : ''}`;
	let classes= `Main ${center ? 'Main--center' : ''}`;
    
    return(
       
        <main className={classes}>{children}</main>
    )
}