import React, {useState, useEffect, useRef} from 'react';
import fetchData from './Functions/getData'






async function getQuestions(questionType) {
  const questions = await fetchData(questionType);
  if(questions){
    questions = shuffleQuestions(questions);
  }
  return questions;
}

const shuffleQuestions = (tempArr) => {
  // Adapted from : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var currentIndex = tempArr.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = tempArr[currentIndex];
    tempArr[currentIndex] = tempArr[randomIndex];
    tempArr[randomIndex] = temporaryValue;
  }
  return tempArr;
}
  
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Question = () => {
  function switchCards(){
    const top = questions.pop();
    setQuestion(top.question);
    setAnswer(top.answer);
    setCategory(top.category);
    setFlipped(false);
    setQuestions(questions);
  }
  const [allQuestions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("Retreiving questions, one moment.");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [questionType, setQuestionType] = useState(false);
  useEffect(() => {
    const questions = getQuestions(questionType);
    const top = questions.pop();
    setQuestion(top.question);
    setAnswer(top.answer);
    setCategory(top.category);
    setFlipped(false);
    setQuestions(questions);
  }, []);
  useEffect(() => {
    const previous = usePrevious(questionType)
    if (questionType !== previous) {
      getQuestion();
    }
    switchQuestions();
  });
  return (
    <div className="body-container">
      <button className="btn btn-dark" onClick={switchCards}>Get New Question</button>
      <div className="container">
          <div className="row">
              <div className="col-md-4 card-container" onClick={answer ? setFlipped(!flipped) : undefined}>
                  <div className={flipped ? "card-flip flip" : "card-flip"}>
                      <div className="card front">
                        <p className="font-weight-bold blue-text">{question}</p>
                        {category &&
                        <p>Category: {category}</p>
                        }
                        {answer &&
                        <p className="click-flip-explanation">Click to see answer</p>
                        }
                      </div>
                      <div className="card back">
                        <p className="font-weight-bold blue-text">{answer}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Question;