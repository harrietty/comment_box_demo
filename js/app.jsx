var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var $ = require('jquery');


var Comment = React.createClass({
  // propTypes: {
  //   author: React.PropTypes.string.isRequired,
  //   children: React.PropTypes.string
  // },
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
    var commentNodes = _.map(this.props.data, function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
      );
    });
    return (
      <div className='commentList'>
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function () {
    return { author: '', text: '' };
  },
  handleAuthorChange: function (e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function (e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if(!text|| !author) {
      return;
    }
    // use the function that has been made available from commentBox via props
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function () {
    return (
      <form className='commentForm' onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Your name' value={this.state.author} onChange={this.handleAuthorChange} />
        <input type='text' placeholder='Say something...' value={this.state.text} onChange={this.handleTextChange} />
        <input type='submit' value='Post' />
      </form>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      cache: false,
      success: function (data) {
        this.setState( { data: data.comments });
        console.log('new data received');
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function (comment) {
    var query = encodeURI('author=' + comment.author + '&text=' + comment.text);
    $.post('https://arcane-sierra-19848.herokuapp.com/api/comments?' + query);
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.interval);
  },
  render: function () {
    return (
      <div className='commentBox'>
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(<CommentBox url='http://arcane-sierra-19848.herokuapp.com/api/comments' interval={10000} />, document.getElementById('app'));
