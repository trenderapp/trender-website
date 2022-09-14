import React from "react";
import Markdown from "./Markdown/Markdown";

function Text({ text, embeds, info }) {
    return (
        <>
            <Markdown info={info} content={text ?? <br />} />
        </>
    )
}

export default Text;