import React from "react"
import Question from "./Question"

// À faire: les bulles du css; media-query? Donner choix pour questions 
// ex: type, difficultés, etc. changer rouge moins flamboyant

function App() {
  const [questionsData, setQuestionsData] = React.useState("")
  const [isQuizzStarted, setIsQuizzStarted] = React.useState(false)
  const [tryAgain, setTryAgain] = React.useState(false)
  const [checkingAnswer, setCheckingAnswer] = React.useState(false)
  const [notDone, setNotDone] = React.useState(false)
  const [answersArray, setAnswersArray] =React.useState(["","","","",""])

  // get the value of the answer and the index of the question and put it into the answersArray for the tally
  function handleCallBack(childData, childDataIndex) {
    let anArray = answersArray
    anArray[childDataIndex] = childData
    setAnswersArray(anArray)
  }

  // calculate the tally
  function sumArray(arr) {
    return arr.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0)
  }

  function startQuizz() {
    setIsQuizzStarted(true)
  }

  function newQuestion() {
    setAnswersArray(["","","","",""])
    setTryAgain(prevState => !prevState)
    setCheckingAnswer(false)
    setNotDone(false)
  }

  function checkAnswer() {
    answersArray.includes("") ? setNotDone(true) : setCheckingAnswer(true)
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      const data = await res.json()
      setQuestionsData(data)
    }
    fetchData()
  }, [tryAgain])


  return (
    <div className="App">
      <div className={`Intro--msg ${isQuizzStarted && "Intro--msg--display"}`}>
        <h1 classnMae="Quizz--title">Quizzical</h1>
        <p>Test your general knowledge of the world!</p>
        <button className="Start--btn" onClick={startQuizz}>Start now!</button>
      </div>
      <div className={`Question--box ${isQuizzStarted && "Question--box--display"}`}>
        {questionsData && questionsData.results.map((result, index) =>(
          <Question 
          parentCallback = {handleCallBack}
          index={index}
          key={result.question}
          checkingAnswer={checkingAnswer}
          question={result.question} 
          type={result.type}
          incorrect_answers={result.incorrect_answers}
          correct_answer={result.correct_answer} 
        />
        ))}
        <div className="App--footer">
          <p className={`Tally ${checkingAnswer && "Tally--display"}`}>you scored {sumArray(answersArray)}/5! </p>
          <button className="Check--btn" onClick={checkingAnswer ? newQuestion : checkAnswer}>
            {checkingAnswer ? "Try again!" : "Check answers!"}
          </button>
        </div>
        <p className={`Not--done ${notDone && "Not--done--display"}`}>Answer all questions before checking the answers!</p>
      </div>
    </div>
  )
}

export default App
