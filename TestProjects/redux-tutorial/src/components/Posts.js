import React from "react";

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(data => data.json())
        .then(data => this.setState({posts: data}));
    }

    render() {
        const postItems = this.state.posts.map(
            post => 
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
        );

        return (
            <div>
                {postItems}
            </div>
        );
    }
}

export default Posts;