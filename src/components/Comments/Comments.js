import React from "react";
import Comment from "./Comment";

export default class Comments extends React.Component {
  state = {
    comments: [],
    loading: true
  };

  async fetchData(url) {
    const response = await fetch(url);
    let data = await response.json();
    return data;
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts/1/comments";
    let data = this.fetchData(url);
    data.then(comments => {
      this.setState(
        {
          comments: comments,
          loading: false
        },
        () => console.log("Comments: ", this.state.comments)
      );
    });
  }

  render() {
    const { comments, loading } = this.state;
    return loading ? "One sec, we're loading." : <Comment comments={comments} />;
  }
}