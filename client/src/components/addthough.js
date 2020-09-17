import React, { Component } from 'react';
import axios from 'axios';

export default class AddThought extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeThought = this.onChangeThought.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      author: '',
      thought: ''
    }
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeThought(e) {
    this.setState({
      thought: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();

    const thought = {
      author: this.state.author,
      thought: this.state.thought
    }

    console.log(thought);

    axios.post('http://localhost:5000/thought', thought)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h1>Add Your Thought</h1>
        <form onSubmit={this.onSubmit}>
            <div>
                <label>Author: </label>
                <input  type="text"
                    required
                    value={this.state.author}
                    onChange={this.onChangeAuthor}
                    />
            </div>
            <div>
                <label>Thought: </label>
                <textarea  type="text"
                    required
                    value={this.state.thought}
                    onChange={this.onChangeThought}
                    />
            </div>

            <div>
                <input type="submit" value="Add Thought"/>
            </div>
        </form>
      </div>
    )
  }
}
