import React from "react";
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'date', headerName: 'Date Created', width: 70 },
  { field: 'username', headerName: 'Username', width: 130 },
  { field: 'currentScore', headerName: 'Current Score', width: 200 }
];

const handleClick = (event) => {
  
}

const Quiz = ({quizzes}) => {
  var rows = quizzes.map(quiz => ({ date: quiz.createddate, username: quiz.username, currentScore: `${quiz.upvotes/(quiz.upvotes + quiz.downvotes)}%` }));
  return (
  <div style={{ height: 400, width: '100%' }}>
    <DataGrid rows={rows} columns={columns} pageSize={5} onClick = {} />
  </div>
  );
}