import React from "react";

import Navbar from "../../Views/Navbar/Navbar";
import Users from "../../Views/Messages/Users";
import ChatBox from "../../Views/Messages/Components/ChatBox";

function Messages({ channel_id }) {

    if (typeof window !== "undefined") {
       var user = JSON.parse(localStorage.getItem("user_info")) ?? null;
    }

    return (
        <div>
            <Navbar />
            <div className="main">
                <section className="messages">
                    <div className="all-chat normal">
                        <div className="mobile">
                            <Users user={user} />
                        </div>
                        <ChatBox user={user} id={channel_id} />
                    </div>
                </section>
            </div>
        </div>
    );
}

export const getServerSideProps = async ({ query }) => {
    return {
      props: {
        section: query.channel_id
      }
    }
}

export default Messages;