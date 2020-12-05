import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

// const viewQuiz = (rowData) =>{
//   console.log(rowData);
//   selectQuiz(rowData);
// }

const Quizzes = () =>{
  const [selectedQuiz, selectQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const [rows, setRows] = useState(null);
  
  const columns = [
    { field: 'id', headerName: 'ID', width: '15%' },
    { field: 'date', headerName: 'Date', width: '30%' },
    { field: 'username', headerName: 'Username', width: '30%' },
    { field: 'currentScore', headerName: 'CurrentScore', width: '25%' }
  ];

  const options = {
    onRowClick: rowData => console.log(rowData)
  };

  useEffect(() => {
    let url = 'https://interviewprepapp.azurewebsites.net/api/quiz/20';
    fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
    }
    }).then(res => {
      console.log(res);
      return res.json()
    })
    .then(quizzes => {
      // console.log(quizzes);
      setQuizzes(quizzes);
      setRows(quizzes.map(quiz => ({ id: quiz.id, date: quiz.createdDate, username: quiz.username ? quiz.username : 'unknown', currentScore: (quiz.upvotes + quiz.downvotes) ? `${quiz.upvotes/(quiz.upvotes + quiz.downvotes)}%` : 0 })));
    })
  }, []);
  
  return (
    <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
    {console.log(columns)}  
    {console.log(rows)}  

    {/* {selectedQuiz ?  */}
      {rows ? 
        <DataGrid rows={rows} columns={columns} pageSize={rows.length > 10 ? 10 : rows.length}/> :
        <>
        </>
      }
        {/* : viewQuiz()} */}
    </div>
  );
}
export default Quizzes;