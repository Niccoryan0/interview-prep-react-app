import React from 'react';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allQuestions : [],
      question : "",
      answer : "",
      category : "",
      flipped : false
    }
  }

  getQuestion(){
    fetch('https://interviewprepapp.azurewebsites.net/api/' + this.props.questionType, {
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
    })
  }

  getTopQuestion(){
    const current = allQuestions.pop();
    if(current){
      this.setState((state) => {
        return {
          question : current.question,
          answer : current.answer,
          category : current.category
        }
      })
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
        @RenderBody()
        <form method="post" className="new-question">
            <button className="btn btn-dark">Get New Question</button>
        </form>
        <div className="container">
            <div className="row">
                <div className="col-md-4 card-container">
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