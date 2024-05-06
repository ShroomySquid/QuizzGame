import React from "react"

export default function Question(props) {
    const [answersArr, setAnswersArr] = React.useState(props.incorrect_answers)
    const [currentAnswer, setCurrentAnswer] = React.useState("")
    const [fixedQuestions, setFixedQuestions] = React.useState(props.question.replace(/&quot;/g, '"'))

    function changeAnswer(event, answer) {
        if (!props.checkingAnswer) {
            setCurrentAnswer(answer)
            if (answer === props.correct_answer) {
                props.parentCallback(1, props.index)
            }
            else {
                props.parentCallback(0, props.index)
            }
        }
    }

    React.useEffect(() => {
        setFixedQuestions(prevState => prevState.replace(/&#039;/g, "'"))
        setAnswersArr(props.incorrect_answers)
        setAnswersArr(prevState => [
            ...prevState,
            props.correct_answer
        ])
        setAnswersArr(prevState =>
            prevState.sort(() => Math.random() - 0.5))
    }, [props.incorrect_answers])

    return (
        <div className="Question">
            <h3>{fixedQuestions}</h3>
            <div className="Answers">
                {answersArr.map(answer => (
                    <button 
                        className={`Answer--btn`} 
                        style={{backgroundColor: 
                            (props.checkingAnswer && answer === props.correct_answer) ? "#94D7A2" 
                            : ((currentAnswer === answer) && (props.checkingAnswer && currentAnswer != props.correct_answer)) ? "#DC143C" 
                            : (currentAnswer === answer) ? "#D6DBF5" 
                            : "#F5F7FB"}} 
                        onClick={event => changeAnswer(event, answer)}
                    >
                        {answer}
                    </button>
                ))}
            </div>
            <hr />
        </div>

    )
}