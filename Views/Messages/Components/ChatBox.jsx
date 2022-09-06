import React, { useEffect, useState } from "react";

import { apibaseurl, userPath } from "../../../Services/constante";
import ChatInput from "./Chat/ChatInput";
import ChatMessage from "./Chat/ChatMessage";
import ChatNav from "./Chat/ChatNav";

function ChatBox({ user, room_id }){

    const [info, setInfo] = useState({})

    useEffect(() => {
        async function getData() {
            const request = await fetch(`${apibaseurl}/rooms/${room_id}`,{
                headers: {
                    'trendertokenapi': `${user ? user.token : null}`
                }
            });
    
            if(request.status !== 200) return;

            const response = await request.json();            
            setInfo(response);
        }

        getData()
    }, [])
    return (
        <div className="chatbox">
                <ChatNav info={info} />
            <div className="chat-section">
                <ChatMessage user={user} room_id={room_id} informations={userPath(null, "base.png")} />
                <ChatInput user={user} room_id={room_id}/>
            </div>
        </div>
    )
}

export default ChatBox;