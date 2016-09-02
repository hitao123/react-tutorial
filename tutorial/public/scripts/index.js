var Comment = React.createClass({
	rawMarkup: function() {
		var md = new Remarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return {
			__html: rawMarkup
		};
	},
	render: function() {
		return ( 
			<div className="comment" >
				<h2 className="commentAuthor">{this.props.author}</h2>
				<p dangerouslySetInnerHTML = {this.rawMarkup()} />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({

	getInitialState: function() {
		return {author: '',text: ''};
	},

	handleAuthorChange: function(e){
		this.setState({author: e.target.value});
	},

	handleTextChange: function(e){
		this.setState({text: e.target.value});
	},

	handleSubmit: function(e){
		e.preventDefault();
		var author = this.state.author.trim();
		var text   = this.state.text.trim();
		if(!author || !text){
			return;
		}
		this.props.onCommentsSubmit({author: author, text: text});
		this.setState({author: '',text: ''});
	},

	render: function() {
		return (
		<form name="form" onSubmit={this.handleSubmit}>
			<input type="text" placeholder="author" value={this.state.author} onChange={this.handleAuthorChange}/>
			<input type="text" placeholder="text" value={this.state.text} onChange={this.handleTextChange}/>
			<input type="submit" value="提交" />
		</form>
		);
	}
});

var CommentBox = React.createClass({

	getInitialState: function() {
		return {data: []};
	},

	loadFromServer : function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr,status,err){
				console.log(this.props.url,status, err.toString());
			}.bind(this)
		});
	},

	componentDidMount: function() {
		this.loadFromServer();
		setInterval(this.loadFromServer,this.props.interval);
	},
    
    handleCommentSubmit: function(comment){
		var comments = this.state.data;
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
    	this.setState({data: newComments});
		$.ajax({
			url: this.props.url,
			type: 'POST',
			dataType: 'json',
			data: comment,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr,status,err){
				this.setState({data: comments});
				console.log(this.props.url,status, err.toString());
			}.bind(this)
		});
    },

	render: function() {
		return (
			<div className="commentBox">
	 			<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentsSubmit={this.handleCommentSubmit}/>
			</div>
		);
	}
});

ReactDOM.render( 
	<CommentBox url='/api/comments'  interval={200}/> ,
	document.getElementById('example')
);