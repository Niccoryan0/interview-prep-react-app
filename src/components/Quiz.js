import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    // '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
    //   maxWidth: 345,
    // },
    // [theme.breakpoints.down("md")] : {
    // maxWidth: 200 

    // },
    width: 600,
  },

  technical: {
    width: 300
  },

  whiteboard: {
    width:400
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
    const classes = this.props;
    console.log(this.state)
    return(
      <FormControl>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {this.state.technical.map((question, i) => (
            <Card className={classes.technical} variant="outlined" >
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
                  multiline
                  rows={6}
                  placeholder="Answer Here"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          ))}
          {this.state.whiteboard.map((question, i) => (
            <Card className={classes.root} variant="outlined">
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
                  multiline
                  rows={6}
                  placeholder="Answer Here"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </FormControl>
    )
  }
}