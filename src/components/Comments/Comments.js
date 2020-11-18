import React from "react";
import Comment from "./Comment";

async function fetchData(url){
  const response = await fetch(url);
  let data = await response.json();
  return data;
}

async function getQuizzes(){
  const url = "https://jsonplaceholder.typicode.com/posts/1/comments";
  let data = fetchData(url);
  data.then(comments => {
    setComments(comments);
    setLoading(false);
    console.log("Comments: ", this.state.comments);
  });
}

const [comments, setComments] = React.useState("");
const [loading, setLoading] = React.useState(true);


const Comments = () => {
  React.useEffect(() => {
    getQuizzes();
  }, []);
  return loading ? "One sec, we're loading." : <Comment comments={comments} />;
}

export default Comments;