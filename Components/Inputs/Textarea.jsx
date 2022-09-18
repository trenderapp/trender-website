import React, { useState } from "react";
import inputStyles from "./Input.module.scss";
import CircleProgress from "../Others/CircleProgress";
import { emojies_defs } from "../Text/Markdown/emojis";
import { useClient } from "../../Context";
import MemberInformations from "../Members/Informations";
import Text from "../Text/Text";

function TextAreaInput({ value, setValue, label, name, placeholder = "", max_length }) {

    const [areaLenght, setArea] = useState(0);
    const [length, setLength] = useState(0)
    const [state, setState] = useState({ type: "none" });
    const { client } = useClient();

    function findSearchString(el) {
        if (el.selectionStart === el.selectionEnd) {
            const cursor = el.selectionStart;
            const content = el.value.slice(0, cursor);

            const valid = /\w/;

            let j = content.length - 1;
            if (content[j] === "@") {
                return ["user", "", j];
            } else if (content[j] === "#") {
                return ["channel", "", j];
            }

            while (j >= 0 && valid.test(content[j])) {
                j--;
            }

            if (j === -1) return;
            const current = content[j];

            if (current === ":" || current === "@" || current === "#") {
                const search = content.slice(j + 1, content.length);
                const minLen = current === ":" ? 2 : 1;

                if (search.length >= minLen) {
                    return [
                        current === "#"
                            ? "channel"
                            : current === ":"
                            ? "emoji"
                            : "user",
                        search.toLowerCase(),
                        current === ":" ? j + 1 : j,
                    ];
                }
            }
        }
    }

    async function onChange(ev) {
        const el = ev.currentTarget;

        const result = findSearchString(el);
        if (result) {
            const [type, search] = result;
            const regex = new RegExp(search, "i");

            if (type === "emoji") {
                // ! TODO: we should convert it to a Binary Search Tree and use that
                const matches = Object.keys(emojies_defs)
                    .filter((emoji) => emoji.match(regex))
                    .splice(0, 5);

                if (matches.length > 0) {
                    const currentPosition =
                        state.type !== "none" ? state.selected : 0;

                    setState({
                        type: "emoji",
                        matches,
                        selected: Math.min(currentPosition, matches.length - 1),
                        within: false,
                    });

                    return;
                }
            }

            if (type === "user") {
                if(search.length < 1) return;
                let users = await client.user.search(search);
                if(users.error) return;
                
                let matches = users.data;
                
                if (matches.length > 0) {
                    const currentPosition =
                        state.type !== "none" ? state.selected : 0;

                    setState({
                        type: "user",
                        matches,
                        selected: Math.min(currentPosition, matches.length - 1),
                        within: false,
                    });

                    return;
                }
            }
        }

        if (state.type !== "none") {
            setState({ type: "none" });
        }
    }

    function selectCurrent(el) {
        
        if (state.type !== "none") {
            const result = findSearchString(el);
            if (result) {
                const [_type, search, index] = result;

                const content = el.value.split("");
                if (state.type === "emoji") {
                    content.splice(
                        index,
                        search.length,
                        state.matches[state.selected],
                        ": ",
                    );
                } else if (state.type === "user") {
                    content.splice(
                        index,
                        search.length + 1,
                        "@",
                        state.matches[state.selected].user_id,
                    );
                }

                setValue(content.join(""));
                setState({
                    type: "none"
                })
            }
        }
    }

    function calcHeight(value) {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        // min-height + lines x line-height + padding + border
        let newHeight = 16 + numberOfLineBreaks * 16 + 12 + 2;
        return newHeight;
    }

    const onPressEnter = (e) => {
        const height = calcHeight(e.target.value);
        setArea(height);
    }

    const percent = () => {
        return (length*100/max_length);
    }

    return (
        <div className={inputStyles.input}>
            <label>{label}</label>
            <textarea id="message" placeholder={placeholder} spellCheck="false" style={{
                minHeight: 80,
                height: `${areaLenght}px`
            }} onKeyUp={(e) => onPressEnter(e)} name={name} value={value} onChange={(e) => {
                onChange(e)
                setValue(e.target.value)
                max_length && setLength(e.target.value.length)
            }} />
            { max_length && <span className={`${inputStyles.text_bottom}`}><CircleProgress number={length} percent={percent()} /></span> }
            {state.type === "user" &&
                    state.matches.map((match, i) => (
                        <div key={i} onClick={() => selectCurrent(document.querySelector("#message"))} style={{ padding: "10px" }}>
                            <MemberInformations full_width info={match} />
                        </div>
                    ))}

            {state.type === "emoji" &&
                    state.matches.map((match, i) => (
                        <div key={i} onClick={() => selectCurrent(document.querySelector("#message"))} style={{ padding: "10px" }}>
                            <Text text={match} />
                        </div>
                    ))}
        </div>
    )
}

export default TextAreaInput;