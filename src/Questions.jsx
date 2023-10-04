import React, {useState} from 'react';


export default function Questions(props) {
  const [selectedAnswer, setSelectedAnswer] = useState()

  function selectAnswer(answer) {
      setSelectedAnswer(answer)
      props.displayScore(answer, props.quizEl.correct_answer, props.quizEl.id)
  }


  function getButtonStyles(answer) {
    let bg;
    let borderEl;
    if(props.displayAnswer) {
      if(selectedAnswer === answer && selectedAnswer === props.quizEl.correct_answer) {
         bg = '#94D7A2'
         borderEl = 'none'
      } else if(selectedAnswer === answer && answer !== props.quizEl.correct_answer) {
        bg = '#F8BCBC'
        borderEl = 'none'
      } else if (answer === props.quizEl.correct_answer) {
        bg = '#94D7A2'
        borderEl = 'none'
      } else {
        bg = 'white'
      }
    } else {
      if(selectedAnswer === answer) {
        bg = '#d6dbf5'
        borderEl = 'none'
      } else {
        bg = '#f5f7fb'
     }
    }
      return {backgroundColor: bg, border: borderEl}
  }

  return (
        
      <div className='quiz'>
      <h3 dangerouslySetInnerHTML={{ __html: props.quizEl.question }} />
         <div className='answers'>
           {props.quizEl.allAnswers.map(answer => {
             return (
               <button onClick={() => {selectAnswer(answer)}} dangerouslySetInnerHTML={{ __html: answer }} key={answer}
                 className='selected-answer' style={getButtonStyles(answer)}></button>
             )
           })}
         </div>
      </div>
  )
}
