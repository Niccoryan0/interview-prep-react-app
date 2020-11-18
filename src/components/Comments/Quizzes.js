import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const viewQuiz = (rowData) =>{
  console.log(rowData);
  selectQuiz(rowData);
}

const getQuizzes = () =>{
  let url = 'https://interviewprepapp.azurewebsites.net/api/quiz/20';
  fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
    }
  }).then(res => res.json())
  .then(quizzes => {
    if(quizzes){
      setQuizzes(quizzes)
    }
  })
}

const Quizzes = () =>{
  const [selectedQuiz, selectQuiz] = React.useState();
  const [quizzes, setQuizzes] = React.useState();

  const columns = [
    { field: 'date', headerName: 'ID', width: '35%' },
    { field: 'userName', headerName: 'Username', width: '35%' },
    { field: 'currentScore', headerName: 'Current Score', width: '30%' },
  ];
  const options = {
    onRowClick: rowData => viewQuiz(rowData)
  };
  React.useEffect(() => {
    getQuizzes();
  }, []);
  const rows = quizzes.map(quiz => ({ date: quiz.createdDate, username: quiz.username, currentScore: `${quiz.upvotes/(quiz.upvotes + quiz.downvotes)}%` }));
  return (
    <div style={{ height: 400, width: '100%' }}>
      {selectedQuiz
        ? <DataGrid rows={rows} columns={columns} pageSize={rows.length > 10 ? 10 : rows.length} options={options} />
        : viewQuiz()}
    </div>
  );
}
export default Quizzes;