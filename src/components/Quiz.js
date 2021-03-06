import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from "react-router-dom";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FancyButton from './FancyButton'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      maxWidth: 345,
    },
    [theme.breakpoints.down("md")] : {
    maxWidth: 200 
    },
    width: 600,
  },

  technical: {
    width: 300
  },

  whiteboard: {
    width:400
  },

  question: {
    fontSize: 12,
  },

  pos: {
    marginBottom: 12,
  },
}));


export default class Quiz extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      technical: [],
      whiteboard: [],
      traversals: [],
      answers: {technical1:"", technical2:"", technical3:"", whiteboard1:"", whiteboard2:""},
      questionsAnswered: false,
      error: false,
      submitted: false
    };
    this.submitQuiz = this.submitQuiz.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);

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

  handleAnswerChange({ target }) {
    this.setState((state) => {
      let answers = Object.assign({}, state.answers)
      answers[target.name] = target.value
      return { answers }
    });
  }

  submitQuiz(){
    const result = {}
    for(let i = 1; i <= this.state.technical.length; i++){
      result['technical' + i + 'q'] = this.state.technical[i];
      result['technical' + i + 'a'] = this.state.answers['technical'+i];
    }
    for(let i = 1; i <= this.state.whiteboard.length; i++){
      result['whiteboard' + i + 'q'] = this.state.whiteboard[i];
      result['whiteboard' + i + 'a'] = this.state.answers['whiteboard'+i];
    }
    console.log(result);
    let url = 'https://interviewprepapp.azurewebsites.net/api/quiz';
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(result)
    }).then(res => {
      if(res.status === 201){
        this.setState({submitted: true})
      }else{
        this.setState({error: 'Something went wrong submitting, please try again.'})
      } 
    });
  }

  componentDidMount(){
    this.getQs();
  }
  
  render(){
    const classes = this.props;
    return(
      <div>
        {!this.state.submitted ?
        <>
          <h3>{this.state.error}</h3>
          <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" padding="5%">
            {this.state.technical.map((question, i) => (
              <Card className={classes.technical} variant="outlined" style={{width:400, marginBottom:20}} >
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Technical
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {question.question}
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label={"Question " + (i+1)}
                    name={'technical' + i}
                    multiline
                    rows={6}
                    placeholder="Answer Here"
                    value={ this.state.answers['q' + i] }
                    onChange={this.handleAnswerChange}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" >
            {this.state.whiteboard.map((question, i) => (
              <Card className={classes.root} variant="outlined" style={{width:400, marginBottom:40, display:"flex", alignContent:"space-between"}}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Whiteboard
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {question.question}
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label={"Question " + (i+4)}
                    name = {'whiteboard' + i}
                    multiline
                    rows={6}
                    placeholder="Answer Here"
                    value={ this.state.answers['q' + (i+3)] }
                    onChange={this.handleAnswerChange}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
          <FancyButton onClick={this.submitQuiz} style={{marginBottom:20}}>
              Submit Quiz
          </FancyButton>    
        </> :
        <>
          <Card variant="outlined" style={{width:400, margin:'auto'}} >
                <CardContent style={{display:'flex', flexDirection:'column',  alignItems:'center'}}>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Quiz submitted! Keep an eye on the forum for feedback.
                  </Typography>
                  <FancyButton variant="contained" component={Link} to="/Forum" style={{marginTop:20}}>
                    To the forum!
                  </FancyButton> 
                  <FancyButton component={Link} to="/" style={{marginTop:20}}>
                    Take me home
                  </FancyButton>  
                </CardContent>
              </Card>
        </>
        }

      </div>
    )
  }
}