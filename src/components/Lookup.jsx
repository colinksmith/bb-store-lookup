import React from "react"

export default function Lookup(props) {

    
    // React.useEffect(() => {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then(data => setAllMemes(data.data.memes))
    // }, [])
    
    
    
    
    
    // function getMemeImage() {
    //     const randomNumber = Math.floor(Math.random() * allMemes.length)
    //     const url = allMemes[randomNumber].url
    //     setMeme(prevMeme => ({
    //         ...prevMeme,
    //         randomImage: url
    //     }))
        
    // }
    
    // function handleChange(event) {
    //     const {name, value} = event.target
    //     setMeme(prevMeme => ({
    //         ...prevMeme,
    //         [name]: value
    //     }))
    // }
    const inputRef = React.useRef(null)
    
    function logSomething() {
        console.log('something')
    }

    return (
        <main>
            <div className="form">
                <input 
                    ref={inputRef}
                    type="text"
                    placeholder="store number e.g. 0448"
                    className="form--input"
                    name="storeNumber"
                    value={props.storeNumber}
                    onChange={() => props.handleChange(inputRef.current.value)}
                />
                <button 
                    className="form--button"
                    onClick={() => props.handleClick()}
                >
                    Look up store
                </button>
            </div>
        </main>
    )
}