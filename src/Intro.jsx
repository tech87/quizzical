import React from "react";

export default function Intro({ handleClick }) {
    return (
        <div className="intro">
            <h1>Quizzical</h1>
            <p className="intro-text">Test your general knowledge with Quizzical!</p>
            <p className="intro-text">Get 5 random questions and see how many answers can you get right. 🥳</p>
            <button onClick={handleClick}>Start Quiz</button>  
        </div>
    )
}