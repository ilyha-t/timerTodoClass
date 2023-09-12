import React, { Component } from 'react';

import TodoList from '../TodoList/TodoList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import config from '../../config/configUI';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: 'All'
    };
  }

  addTodo = (todo) => {
    this.setState(() => {
        return {
          todos: [
            ...this.state.todos,
            {
              id: Date.now(),
              description: todo.label,
              done: false,
              important: false,
              created: new Date(),
              timer: todo.timer,
            },
          ],
        };
      });
  };

  doneTodo = (todo) => {
      const findIndex = this.state.todos.findIndex((f) => f.id === todo.id);
      this.setState(() => {
        return {
          todos: [
            ...this.state.todos.slice(0, findIndex),
            { ...todo, done: !todo.done },
            ...this.state.todos.slice(findIndex + 1),
          ],
        };
      });
  };

  deleteTodo = (id) => {
      const findIndex = this.state.todos.findIndex((f) => f.id === id);
      this.setState(() => {
        return {
          todos: [...this.state.todos.slice(0, findIndex), ...this.state.todos.slice(findIndex + 1)],
        };
      });
  };

  filterTodo = (filterName) => {
    switch (filterName) {
      case 'Active':
        return this.state.todos.filter((todo) => !todo.done);
      case 'Completed':
        return this.state.todos.filter((todo) => todo.done);
      default:
        return this.state.todos;
    }
  };

  changeFilterTodo = (element) => {
      const newFilter = element.target.textContent;
      this.setState({ filter: newFilter });
      this.filterTodo(newFilter);
  };

  clearCompleted = () => {
      this.setState(() => {
        return {
          todos: this.state.todos.filter((todo) => !todo.done),
        };
      });
  };

  editTodo = (todo, value) => {
      const findIndex = this.state.todos.findIndex((f) => f.id === todo.id);
      this.setState(() => {
        return {
          todos: [
            ...this.state.todos.slice(0, findIndex),
            { ...todo, description: value },
            ...this.state.todos.slice(findIndex + 1),
          ],
        };
      });
  };

  resetTodo = (todo, timer=0) => {
      const findIndex = this.state.todos.findIndex((f) => f.id === todo.id);
      this.setState(() => {
        return {
          todos: [
            ...this.state.todos.slice(0, findIndex),
            { ...this.state.todos[findIndex], timer },
            ...this.state.todos.slice(findIndex + 1),
          ],
        };
      });
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addTodo={this.addTodo} config={config} />
        <TodoList
          todos={this.filterTodo(this.state.filter)}
          doneTodo={this.doneTodo}
          deleteTodo={this.deleteTodo}
          editTodo={this.editTodo}
          resetTodo={this.resetTodo}
          config={config}
        />
        <Footer
          todoCount={this.state.todos.filter((todo) => !todo.done).length}
          filter={this.state.filter}
          changeFilterTodo={this.changeFilterTodo}
          filters={config.filters}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
