import React, { useState, useContext } from "react";

import Svg from "../../../../Components/Svg/Svg";
import { WebsocketContext } from "../../../../Context/AppContext";

function ChatInput({ user, room_id }) {
    const ws = useContext(WebsocketContext);

    const [message, setMessage] = useState("");
    
    const handleChange = async (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message !== "") {
            if (ws.readyState === ws.OPEN) {

                const data = {
                    code: "send_message",
                    token: user.token,
                    data: {
                        user_id: user.user_id,
                        room_id: room_id,
                        message: message
                    }
                };
                
                ws.send(JSON.stringify(data));
                
                setMessage("");
            } else {
                // serveur down, mettre message en rouge par exemple
            }
        }
    }
    
    return (
        <div className="input">
            <button >
                <Svg name="files" size={22} />
            </button>
            <button >
                <Svg name="emoji" size={22} />
            </button>
            <textarea placeholder="Ecrire un message" type="text" value={message} onChange={handleChange} />
            <button onClick={sendMessage}>
                <Svg name="paper-plane" size={22} />
            </button>
        </div>
    )
}

export default ChatInput;