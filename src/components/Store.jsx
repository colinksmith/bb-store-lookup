import React from "react"

export default function(props) {
    const {store} = props
    return (
        <div>
            <h3>{store && store.title}<span> ({store.number.slice(-4)})</span></h3>
            <p>{store && store['address1']}</p>
            <p>{store && store['address2']}</p>
            <button onClick={() => props.handleClick()}>Copy store zip code</button>
            <a className="button" href={store && store.link} >Go to store details</a>
        </div>
    )
}