import React, { useState } from "react";
import inputStyles from "./Input.module.scss";
import CircleProgress from "../Others/CircleProgress";

function TextAreaInput({ value, onChange, label, name, placeholder = "", max_length }) {

    const [areaLenght, setArea] = useState(0);
    const [length, setLength] = useState(0)

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
            <textarea placeholder={placeholder} spellCheck="false" style={{
                minHeight: 80,
                height: `${areaLenght}px`
            }} onKeyUp={(e) => onPressEnter(e)} name={name} value={value} onChange={(e) => {
                onChange && onChange(e)
                max_length && setLength(e.target.value.length)
            }} />
            { max_length && <span className={`${inputStyles.text_bottom}`}><CircleProgress number={length} percent={percent()} /></span> }
        </div>
    )
}

export default TextAreaInput;