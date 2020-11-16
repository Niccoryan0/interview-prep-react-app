// import React from "react";
// import { DataGrid } from '@material-ui/data-grid';

// const columns = [
//   { field: 'date', headerName: 'Date Created', width: '35%' },
//   { field: 'username', headerName: 'Username', width: '35%' },
//   { field: 'currentScore', headerName: 'Current Score', width: '30%' }
// ];

// const openQuiz = (event) => {

// }

// const Quiz = ({quizzes}) => {
//   const rows = quizzes.map(quiz => ({ date: quiz.createddate, username: quiz.username, currentScore: `${quiz.upvotes/(quiz.upvotes + quiz.downvotes)}%` }));
//   const quizCount = quizzes.length > 6 ? 6 : quizzes.length;
//   return (
//   <div style={{ height: 600, width: '100%' }}>
//     <DataGrid rows={rows} columns={columns} pageSize={quizCount} onClick = {openQuiz} />
//   </div>
//   );
// }

import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];


export default function DataTable() {
  const rows = quizzes.map(quiz => ({ date: quiz.createddate, username: quiz.username, currentScore: `${quiz.upvotes/(quiz.upvotes + quiz.downvotes)}%` }));
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}