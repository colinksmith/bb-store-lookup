import React from "react"

export default function Header() {
    return (
        <header className="header">
            <img 
                // src="./images/troll-face.png" 
                className="header--image"
            />
            <h2 className="header--title">Bestbuy store number lookup</h2>
            <h4 className="header--project">Enter the 4 digit store number (include leading zeroes)</h4>
        </header>
    )
}