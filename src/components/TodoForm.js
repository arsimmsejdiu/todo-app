import React, { Component } from "react";
import uuid from 'uuid/dist/v4';
import "./TodoForm.css"

class TodoForm extends Component {
  state = {
    task: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.create({ ...this.state , id: uuid() , completed: false});
    this.setState({ task: "" });
  };

  render() {
    return (
      <form className='NewTodoForm' onSubmit={this.handleSubmit}>
        <label htmlFor="task">New Todo </label>
        <input
          name="task"
          type="text"
          id="task"
          placeholder="New Todo ..."
          value={this.state.task}
          onChange={this.handleChange}
        />
        <button>Add Todo</button>
      </form>
    );
  }
}

export default TodoForm;
