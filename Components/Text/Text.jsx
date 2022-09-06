import React from "react";
import Markdown from "./Markdown/Markdown";

function Text({ text, embeds }) {
    return (
        <>
            <Markdown content={text ?? <br />} />
        </>
    )
}

export default Text;