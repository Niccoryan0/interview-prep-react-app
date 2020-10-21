import React from 'react';

export default class Quiz extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      technical: [],
      whiteboard: [],
      traversals: []
    }
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
    return tempArr;
  }

  getQs(){
    const routes = ['technical', 'whiteboard', 'traversals'];
    routes.forEach(route => {
      let url = 'https://interviewprepapp.azurewebsites.net/api/' + route;
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
          questions = this.shuffleQuestions(questions);
          this.setState((state) => {
            questions = route === 'technical' ? questions.slice(0,3) : questions.slice(0,2) 
            return { [route] : questions }
          })
        }
      })
    })
  }

  componentDidMount(){
    this.getQs();
  }
  
  render(){
    console.log(this.state)
    return(
      <p>Quiz Stuff</p>
    )
  }
}