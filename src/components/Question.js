import React from 'react';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allQuestion : [],
      question : "Retreiving questions, one moment.",
      answer : "",
      category : "",
      flipped : false,
      questionType: this.props.location.state.questionType
    }
    this.flipCard = this.flipCard.bind(this);
    this.getTopQuestion = this.getTopQuestion.bind(this)

  }

  getQuestion(){
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

  shuffleQuestions(tempArr){
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

  getTopQuestion(){
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

  componentDidMount(){
    this.getQuestion();
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.location.state.questionType !== prevProps.location.state.questionType) {
      this.getQuestion();
    }
  }

  flipCard(){
    if(this.state.answer){
      const current = this.state.flipped;
      this.setState({ flipped: !current });
    }
  }

  render(){
    return (
      <div className="body-container">
        <button className="btn btn-dark" onClick={this.getTopQuestion}>Get New Question</button>
        <div className="container">
            <div className="row">
                <div className="col-md-4 card-container" onClick={this.flipCard}>
                    <div className={this.state.flipped ? "card-flip flip" : "card-flip"}>
                        <div className="card front">
                          <p className="font-weight-bold blue-text">{this.state.question}</p>
                          {this.state.category &&
                          <p>Category: {this.state.category}</p>
                          }
                          {this.state.answer &&
                          <p className="click-flip-explanation">Click to see answer</p>
                          }
                        </div>
                        <div className="card back">
                          <p className="font-weight-bold blue-text">{this.state.answer}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Question;