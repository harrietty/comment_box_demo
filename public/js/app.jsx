var React = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({
  propTypes: {
    author: React.PropTypes.string.isRequired,
    children: React.PropTypes.string
  },
  render: function () {
    return (
      <div className='comment'>
        <h2>{this.props.author}</h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    return (
      <div className='commentList'>
        <Comment author='Jim'>This is the first comment</Comment>
        <Comment author='Foo'>Here's another comment</Comment>
        <Comment author='Bar'>And one more comment</Comment>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function () {
    return (
      <div className='commentForm'>
        I am a commentForm
      </div>
    );
  }
});

var CommentBox = React.createClass({
  render: function () {
    return (
      <div className='commentBox'>
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(<CommentBox />, document.getElementById('app'));
