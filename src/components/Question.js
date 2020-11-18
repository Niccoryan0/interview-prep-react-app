import React, {useState, useEffect, useRef, useCallback} from 'react';
import fetchData from './Functions/getData'


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

const Question = (props) => {
  const [allQuestions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("Retreiving questions, one moment.");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [questionType, setQuestionType] = useState(props.questionType || "technical");
  const switchCards = useCallback(() => {
    const top = allQuestions.pop();
    setQuestion(top.question);
    setAnswer(top.answer);
    setCategory(top.category);
    setFlipped(false);
    setQuestions(allQuestions);
  }, []);
  useEffect(async () => {
    console.log(questionType)
    let url = 'https://interviewprepapp.azurewebsites.net/api/' + props.questionType;
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      }
    }).then(res => res.json())
    .then(questions => {
      if(questions){
        questions = shuffleQuestions(questions);
      }
      console.log(questions);
      const top = questions.pop();
      setQuestion(top.question);
      setAnswer(top.answer);
      setCategory(top.category);
      setFlipped(false);
      setQuestions(questions);
    })
  }, []);
  // useEffect(() => {
  //   const previous = usePrevious(questionType)
  //   if (questionType !== previous) {
  //     getQuestions();
  //   }
  // });
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