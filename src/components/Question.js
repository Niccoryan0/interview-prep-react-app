import React, {useState, useEffect} from 'react';
import fetchData from './Functions/getData'



const [allQuestions, setQuestions] = useState([]);
const [question, setQuestion] = useState("Retreiving questions, one moment.");
const [answer, setAnswer] = useState("");
const [category, setCategory] = useState("");
const [flipped, setFlipped] = useState(false);
const [questionType, setQuestionType] = useState(false);


const getQuestion = () => {
  const questions = await fetchData(questionType);
  if(questions){
    shuffleQuestions(questions);
  }
  getTopQuestion();
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
  setQuestions(tempArr)
}

const getTopQuestion = () =>{
  const current = allQuestions.pop();
  if(current){
    setQuestion(current.question);
    setAnswer(current.answer);
    setCategory(current.category);
    setFlipped(false);
  }
}

const flipCard = () =>{
  if(answer){
    setFlipped(!flipped)
  }
}
  
const Question = () => {
  useEffect(() => {
    getQuestion();
  }, []);
  useEffect(() => {
    const prev = useRef();
    useEffect(() => {
      prev.current = value;
    });
    if (questionType !== prev) {
      getQuestion();
    }
  });
  return (
    <div className="body-container">
      <button className="btn btn-dark" onClick={getTopQuestion}>Get New Question</button>
      <div className="container">
          <div className="row">
              <div className="col-md-4 card-container" onClick={flipCard}>
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