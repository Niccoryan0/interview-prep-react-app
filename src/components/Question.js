import React from 'react';
import fetchData from './Functions/getData'



const [allQuestions, setQuestions] = React.useState([]);
const [question, setQuestion] = React.useState("Retreiving questions, one moment.");
const [answer, setAnswer] = React.useState("");
const [category, selectCategory] = React.useState("");
const [flipped, setFlipped] = React.useState(false);
const [questionType, setQuestionType] = React.useState(false);


const getQuestion = () => {
    let url = 'https://interviewprepapp.azurewebsites.net/api/' + this.props.location.state.questionType;
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
        this.shuffleQuestions(questions);
      }
      this.getTopQuestion();
    })
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
  this.setState((state) => {
    return {allQuestions : tempArr}
  })
}

const getTopQuestion = () =>{
  const current = this.state.allQuestions.pop();
  if(current){
    this.setState((state) => {
      return {
        question : current.question,
        answer : current.answer,
        category : current.category,
        flipped : false
      }
    })
  }
}

const componentDidMount = () =>{
  this.getQuestion();
}

const componentDidUpdate(prevProps, prevState){
  if (this.props.location.state.questionType !== prevProps.location.state.questionType) {
    this.getQuestion();
  }
}

const flipCard = () =>{
  if(this.state.answer){
    const current = this.state.flipped;
    this.setState({ flipped: !current });
  }
}
  
const Question = () => {
  React.useEffect(() => {
    getQuizzes();
  }, []);
  return (
    <div className="body-container">
      <button className="btn btn-dark" onClick={getTopQuestion}>Get New Question</button>
      <div className="container">
          <div className="row">
              <div className="col-md-4 card-container" onClick={flipCard}>
                  <div className={state.flipped ? "card-flip flip" : "card-flip"}>
                      <div className="card front">
                        <p className="font-weight-bold blue-text">{state.question}</p>
                        {state.category &&
                        <p>Category: {state.category}</p>
                        }
                        {state.answer &&
                        <p className="click-flip-explanation">Click to see answer</p>
                        }
                      </div>
                      <div className="card back">
                        <p className="font-weight-bold blue-text">{state.answer}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Question;