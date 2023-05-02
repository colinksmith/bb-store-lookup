import React from "react"

export default function(props) {
    const {store} = props
    return (
        <div>
            <h3>{store && store.title}</h3>
            <p>{store && store['address-1']}</p>
            <p>{store && store['address-2']}</p>
            <button onClick={() => props.handleClick}>Copy store zip code</button>
            <a href={store && store.link} >Go to store details</a>
        </div>
    )
}