import React, { Component } from "react";
import "./Todo.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Todo extends Component {
  state = {
    isEditing: false,
    task: this.props.task,
  };

  handleRemove = () => {
    this.props.remove(this.props.id);
  };

  toggleForm = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleToggle = (event) => {
    this.props.toggleTodo(this.props.id);
  };

  handleUpdate = (event) => {
    event.preventDefault();
    this.props.update(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <CSSTransition key='editing' timeout={500} classNames='form'>
          <form className='Todo-edit-form' onSubmit={this.handleUpdate}>
            <input
              type='text'
              value={this.state.task}
              name='task'
              onChange={this.handleChange}
            />
            <button>Save</button>
          </form>
        </CSSTransition>
      );
    } else {
      result = (
        <CSSTransition key='normal' timeout={500} classNames='task-text'>
          <li className='Todo-task' onClick={this.handleToggle}>
            {this.state.task}
          </li>
        </CSSTransition>
      );
    }
    return (
      <TransitionGroup
        className={this.props.completed ? "Todo completed" : "Todo"}
      >
        {result}
        <div className='Todo-buttons'>
          <button onClick={this.toggleForm}>
            <i class='fas fa-pen' />
          </button>
          <button onClick={this.handleRemove}>
            <i class='fas fa-trash' />
          </button>
        </div>
      </TransitionGroup>
    );
  }
}

export default Todo;
