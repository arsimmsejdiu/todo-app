import React, { Component } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoList extends Component {
  state = {
    todos: [],
  };

  createTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  removeTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  updateTodo = (id, updatedTask) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  toggleCompletion = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  render() {
    const todos = this.state.todos.map((todo) => {
      return (
        <CSSTransition key={todo.id} timeout={500} classNames='todo'>
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            completed={todo.completed}
            remove={this.removeTodo}
            update={this.updateTodo}
            toggleTodo={this.toggleCompletion}
          />
        </CSSTransition>
      );
    });
    return (
      <div className="TodoList">
        <h1>Todo List <span>A Simple React Todo App.</span></h1>
        <ul>
        <TransitionGroup className='todo-list'>{todos}</TransitionGroup>
        </ul>
        <TodoForm create={this.createTodo} />
      </div>
    );
  }
}

export default TodoList;
