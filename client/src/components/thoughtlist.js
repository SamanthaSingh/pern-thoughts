import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = props => (
    <tr>
        <td>{props.thought.author}</td>
        <td>{props.thought.thought}</td>
        <td><Link to={"/edit/"+props.thought.thought_id} style={{textDecoration: 'none', color: 'black', border: '1px solid black', backgroundColor: 'yellow', padding: '3px', borderRadius: '3px', textTransform: 'uppercase', fontSize: '18pt'}}>Edit</Link></td>
        <td><a href="/" onClick={() => { props.deleteThought(props.thought.thought_id) }}>Delete</a></td>
    </tr>
)

export default class ThoughtList extends Component {
    constructor(props) {
        super(props);
        this.state = { thought: [] };
        this.deleteThought = this.deleteThought.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/')
        .then(response => {
            this.setState({thought: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteThought(id) {
        axios.delete('http://localhost:5000/thought/'+id)
          .then(res => console.log(res.data));
        this.setState({
          thought: this.state.thought.filter(el => el.id !== id)
        })
      }
    
      thoughtsList() {
        return this.state.thought.map(currentthought => {
          return <List thought={currentthought} deleteThought={this.deleteThought} key={currentthought.thought_id}/>;
        })
      }

    render() {
        return(
            <div>
                <h1>Thought List</h1>
                <table>
                    <thead>
                        <tr>
                        <th>Author</th>
                        <th>Thought</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.thoughtsList()}
                    </tbody>
                </table>
            </div>
        );
    }
}