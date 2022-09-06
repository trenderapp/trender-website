import React, { useState, useContext, useEffect } from "react"; 
import PostHeader from "../../../../Components/Posts/Views/Components/PostHeader";
import Text from "../../../../Components/Text/Text";
import { WebsocketContext } from "../../../../Context/AppContext";
import { apibaseurl } from "../../../../Services/constante";

function ChatMessage({ user, room_id }) {

    const ws = useContext(WebsocketContext);

    const [messages, setMessages] = useState([]);
    
    useEffect(() => {

        async function getMessages() {
            const request = await fetch(`${apibaseurl}/chats/${room_id}/messages`,{
                headers: {
                    'trendertokenapi': `${user ? user.token : null}`
                }
            });
    
           const response = await request.json();

           if (!response.error) {
                setMessages(response);
            }
        }

        getMessages();
    }, [room_id])

    ws.onmessage = function (req) {
        
        const parsed = JSON.parse(req.data);
        const data = parsed.data;
    
        setMessages([data, ...messages]);
    }
    
    return (
        <div className="chatmessages">
            { messages.map((value, index) =>
            <div key={index} className="chat-user">
                <div className="informations">
                    <PostHeader chat info={value} type="ChatMessage" />
                </div>
                <div className="chatmessages-message">
                    <Text  text={value.data.message}/>
                </div>
            </div>
            )}
        </div>
    )
}

export default ChatMessage;