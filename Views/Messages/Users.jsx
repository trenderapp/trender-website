import React, { useState, useEffect } from "react";
import { apibaseurl, userPath } from "../../Services/constante";
import CreateLink from "../../Components/Text/Link";
import Svg from "../../Components/Svg/Svg";

function Users({ user }) {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        async function getRooms() {
            const request = await fetch(`${apibaseurl}/user/me/rooms`,{
                headers: {
                    'trendertokenapi': `${user ? user.token : null}`
                }
            });
    
            const response = await request.json();            
            if (!response.error) {
                setRooms(response);
            }
        }

        getRooms()
    }, [])

    return (
        <nav>
            <div className="chat-nav-top">
                <p>Messages</p>
                <span><Svg name="edit" size={22} /></span>
            </div>
            
            <div id="contact-section" className="contact">
                { rooms.length > 0 ?
                    rooms.map((value, index) =>
                    <CreateLink key={index} className="contact-info" href={"/messages/" + value.room_id}>
                        <div className="chat-user-box">
                            <div className="chat-user">
                                <img className="pdp-48" src={userPath(value.room_id, value.avatar, "rooms")} alt="pdp" />
                                <div>
                                    <div className="date-username">
                                        <span className="name">{value.room_name}</span>
                                        <span className="time">{value.date_creation}</span>
                                    </div>
                                    { /*<span className="preview">{value.last_message ? value.last_message.message : "..."}</span>*/ }
                                </div>
                            </div>
                        </div>
                    </CreateLink>
                    ) : <p>Aucun contact</p>
                }
            </div>
        </nav>
    )
}

export default Users;