import React from "react";

export const LinksCard=({link})=>{
return(<>
        <h2>Links</h2>
        <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
        <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
        <p>Count clicks:<strong>{link.clicks}</strong></p>
        <p>Data create:<strong>{new Date(link.data).toLocaleDateString()}</strong></p>
    </>
)
}
