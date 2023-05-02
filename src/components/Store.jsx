import React from "react"

export default function(props) {
    return (
        <div>
            <h3>store name</h3>
            <p>Store address - 1</p>
            <p>Store address - 2</p>
            <button onClick={() => props.handleClick}>Copy store zip code and open locator</button>
        </div>
    )
}