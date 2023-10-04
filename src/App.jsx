import React, {useState, useEffect} from 'react';
import './App.css';
import Questions from './Questions';
import Intro from './Intro';
import {nanoid} from 'nanoid'
import Lottie from 'lottie-react';
import animationData from "./manAnimated.json"
import animationMark from "./questionMark.json"

function App() {
const [displayPages, setDisplayPages] = useState(1)
const [quiz, setQuiz] = useState([])
const [displayAnswer, setDisplayAnswer] = useState(false)
const [score, setScore] = useState(0) 
const [answers, setAnswers] = useState({})


function getQuestionsFromAPI() {
  fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
  .then(resp => resp.json())
  .then(data => {
    return data.results.map(result => {
      return { question: result.question,
               correct_answer: result.correct_answer,
               allAnswers: [...result.incorrect_answers, result.correct_answer].sort(function(){return 0.5 - Math.random()}),
               selectedAnswer: null,
               id: nanoid()
     }
    })
  })
  .then(data => {
    setQuiz(data);
    const x = data.reduce((acc, curr) => {
      return {...acc, [curr.id]: null}
    }, {})
    setAnswers(x)
  })
}

useEffect(()=> {
  getQuestionsFromAPI()
}, [])

function showPages() {
  setDisplayPages(displayPages + 1)
  if(displayPages === 2) {
    setDisplayPages(1)
  }
}

function showAnswers() {
  const nonNullAnswers = Object.values(answers).filter(answer => answer !== null).length
  if(nonNullAnswers === quiz.length) {
    if(displayAnswer === false) {
     setDisplayAnswer(true) 
    } else {
     setDisplayAnswer(false)
     getQuestionsFromAPI()
     setScore(0)
    }
  }
}

function displayScore(selected, correct, id) {
  const prevAnswers = {...answers, [id]: selected === correct}
  setAnswers(prevAnswers)
  const correctAnswers = Object.values(prevAnswers).filter(answer => answer).length
  setScore(correctAnswers)
}

const quizElements = quiz.map(quizEl => <Questions key={quizEl.id}
quizEl={quizEl}
displayAnswer={displayAnswer}
displayScore={displayScore}
/>)

  return (
    <React.Fragment>
    {displayPages === 1 && <Intro handleClick={showPages}/>}
    {displayPages === 2 && <div className='main-content'>{quizElements} <div className='check-btn-wrapper'><button onClick={showAnswers} 
            className='check-btn'>{displayAnswer ? 'New Quiz' : 'Check Answers'}</button></div></div>}
    {displayAnswer && <h3>Score: {score} / {quiz.length} correct answers</h3>}
      <Lottie animationData={animationData} loop={true} className='animatedData'/>
      <Lottie animationData={animationMark} loop={true} className='animatedMark'/>
    </React.Fragment>
  );
}

export default App;

