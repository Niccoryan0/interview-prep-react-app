import React from 'react';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      question : "",
      answer : "",
      category : "",
      flipped : false
    }
    this.flipCard = this.flipCard.bind(this);
    this.getTopQuestion = this.getTopQuestion.bind(this)

  }

  getQuestion(){
    
    let url = 'https://interviewprepapp.azurewebsites.net/api/' + this.props.location.state.questionType;
    console.log(url);
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
        this.setState((state) => {
          return {allQuestions : questions}
        })
      }
      console.log(this.state.allQuestions);
      this.shuffleQuestions();
      this.getTopQuestion();
    })
  }

  shuffleQuestions(){
    // Adapted from : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = this.state.allQuestions.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = this.state.allQuestions[currentIndex];
      this.state.allQuestions[currentIndex] = this.state.allQuestions[randomIndex];
      this.state.allQuestions[randomIndex] = temporaryValue;
    }
  }

  getTopQuestion(){
    console.log(this.state.allQuestions);
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
    console.log(this.state.question);
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