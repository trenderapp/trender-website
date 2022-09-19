import React from "react";

import styles from "./Markdown.module.scss";

import twemoji from "twemoji";
import { emojies_defs } from "./emojis";


// Handler for code block copy.
if (typeof window !== "undefined") {
    window.copycode = function (element) {
        try {
            const code = element.parentElement?.parentElement?.children[1];
            if (code) {
                navigator.clipboard.writeText(code.textContent?.trim() ?? "");
            }
        } catch (e) {}
    };
}

const RE_TWEMOJI = /:(\w+):/g;

// ! FIXME: Move to library
const RE_HASHTAG = /#[A-z0-9]/g;
const RE_BR = /\n/g;

// export const RE_MENTIONS = /<@([A-z0-9]{26})>/g;
export const RE_MENTIONS = /@[A-z0-9]{1,33}/g;
export const RE_LINKS = /(https?:\/\/[^\s]+)/g;

export default function Renderer({ content, info }) {

    if (typeof content === "undefined") return null;
    if (content.length === 0) return null;

    // We replace the message with the mention at the time of render.
    // We don't care if the mention changes.
    const newContent = content.type ? "" : content
        .replace(RE_MENTIONS, (sub, ...args) => {
            const nickname = sub.replace(/@/g, "");
            
            if(info?.mentions.length < 1) return `<a dir="ltr" class="link" role="link" href="/${nickname}">${sub}</a>`;

            const find = info.mentions.find(m => m.nickname === nickname);
            if(!find) return `<a dir="ltr" class="link" role="link" href="/${nickname}">${sub}</a>`;

            return `<a dir="ltr" class="link" role="link" href="/${nickname}">${find.username}</a>`;
        })
        .replace(RE_HASHTAG, (sub, ...args) => {
            return `<a dir="ltr" class="link" role="link" href="/hashtag/${sub.split("\n")[0].replace("#", "")}">${sub}</a>`;
        })
        .replace(RE_LINKS, (sub, ...args) => {
            return `<a dir="ltr" class="link" role="link" href="${sub.split("\n")[0]}">${sub.split("\n")[0]}</a>`;
        })
        .replace(RE_TWEMOJI, (sub) => {
            const idx = sub.replace(/:/g, "")
            
            return twemoji.parse(emojies_defs[idx]).toString()
        })
        .replace(RE_BR, "<br/>");

    return (
        <p className={styles.markdown} dangerouslySetInnerHTML={{
                __html: newContent,
            }} />
    );
}