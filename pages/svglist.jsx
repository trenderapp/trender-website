import React from "react";
import Svg from "../Components/Svg/Svg";
import svgList from "../Components/Svg/SvgList";

function SvgListHome() {

    const copyToClipboard = async (name) => {
        if(typeof navigator !== "undefined") {
            await navigator.clipboard.writeText(`${name}`)
            alert("copié")
        } 
    }

    return (
        <div style={{
            display: "flex",
            flexFlow: "column wrap",
            gap: 5,
            alignContent: "space-evenly",
            justifyContent: "space-around",
            width: "100vw",
            overflow: "auto",
            height: "100vh"
        }}>
            {
                svgList.map((svg, index) => 
                    <div key={index} style={{
                        padding: 10,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10
                    }}>
                        <span style={{
                            cursor: "pointer"
                        }} onClick={() => copyToClipboard(svg.name)}>{svg.name}</span>
                        <Svg hover pointer name={svg.name} size={22}/>
                    </div>
                )
            }
        </div>
    )
} 

export default SvgListHome;