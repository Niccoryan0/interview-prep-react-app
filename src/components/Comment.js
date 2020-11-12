import React from 'react';


class Comment extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="comment panel panel-default">
        <div id="userInfo">
          <img src={this.props.comment.avatar}></img>
          <div className="panel-heading">
            <h4>{this.props.comment.username}</h4>
          </div>
        </div>
        <div className="panel-body">
          <p>{this.props.comment.comment}</p>
          <p>{this.props.comment.upvotes - this.props.comment.downvotes}</p>
        </div>
      </div>
    )
  }
}

export default Comment;