import React from "react";
import Navbar from "../Navbar/Navbar";
import Seo from "../Seo";

import styles from "../../Style/All.module.scss";
import ChatBox from "./Components/ChatBox";
import FakeChatBox from "./Components/FakeChatBox";
import Users from "./Users";

function MessagesHome({ user, id }) {
    return (
        <div>
            <Seo title="Messages" description="Access to all of you privates messages and groups" />
            <Navbar />
                <section className={`messages ${styles.full_screen_height} ${styles.margin_auto} ${styles.max_width}`} >
                    <div className="all-chat">
                        <Users user={user} />
                        <div className="mobile">  
                            { id ? <ChatBox user={user} id={id} /> : <FakeChatBox user={user} />}
                        </div>
                    </div>
                </section>
        </div>
    )
}

export default MessagesHome;