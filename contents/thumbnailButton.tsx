import { sendToBackground } from "@plasmohq/messaging";
import { createRoot } from "react-dom/client"
import type { PlasmoCSConfig } from "plasmo"
import React from "react"

export const config: PlasmoCSConfig = {
    matches: ["https://accounts.booth.pm/library*"]
}

const getThumbnail = async() => {
    try{
        sendToBackground({
            name: "getThumbnail",
            body: {
                status: true
            }
        })
        await sendToBackground({
            name: "monitoringPages",
            body: {
                status: true
            }
        })
    } catch (error) {
        console.log("実行できませんでした:", error)
    }
}

//plasmoのエラー対策 特に意味はなし
const EmptyElement: React.FC = () => {
    return <></>
}

const CustomButton = () => {
    return <button onClick={getThumbnail}>Custom button</button>
}

window.addEventListener("load", () => {
    const target = document.querySelector("ul")
    if (!target) return
    console.log(target)

    const container = document.createElement("div")
    target.after(container)

    const root = createRoot(container)
    root.render(<CustomButton />)
})

export default EmptyElement