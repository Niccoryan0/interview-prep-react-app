import React from 'react';


class Comment extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="comment panel panel-default">
        <img src={this.props.comment.avatar}></img>
        <div className="panel-heading">
          <h4>{this.props.comment.username}</h4>
        </div>
        <div className="panel-body">
          {this.props.comment.comment}
        </div>
      </div>
    )
  }
}

(sortSwitch === "title" ? (a.title > b.title ? 1 : -1) : (a.horns > b.horns ? 1 : -1))

export default Comment;