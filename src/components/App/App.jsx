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
      filter: 'All',
      filterTodos: [],
    };
  }

  addTodo = (todo) => {
    new Promise((resolve) => {
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
      resolve();
    }).then(() => this.filterTodo(this.state.filter));
  };

  doneTodo = (todo) => {
    new Promise((resolve) => {
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
      resolve();
    }).then(() => this.filterTodo(this.state.filter));
  };

  deleteTodo = (id) => {
    new Promise((resolve) => {
      const findIndex = this.state.todos.findIndex((f) => f.id === id);
      this.setState(() => {
        return {
          todos: [...this.state.todos.slice(0, findIndex), ...this.state.todos.slice(findIndex + 1)],
        };
      });
      resolve();
    }).then(() => {
      this.filterTodo(this.state.filter);
    });
  };

  filterTodo = (filterName) => {
    switch (filterName) {
      case 'Active':
        console.log(this.state)
        this.setState({
          filterTodos: this.state.todos.filter((todo) => !todo.done),
        });
        break;
      case 'Completed':
        this.setState({
          filterTodos: this.state.todos.filter((todo) => todo.done),
        });
        break;
      default:
        this.setState({ filterTodos: [...this.state.todos] });
        break;
    }
  };

  changeFilterTodo = (element) => {
    new Promise((resolve) => {
      this.setState({ filter: element.target.textContent });
      resolve();
    }).then(() => this.filterTodo(this.state.filter));
  };

  clearCompleted = () => {
    new Promise((resolve) => {
      this.setState(() => {
        return {
          todos: this.state.todos.filter((todo) => !todo.done),
        };
      });
      resolve();
    }).then(() => this.filterTodo(this.state.filter));
  };

  editTodo = (todo, value) => {
    new Promise((resolve) => {
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
      resolve();
    }).then(() => this.filterTodo(this.state.filter));
  };

  resetTodo = (todo, timer=0) => {
    new Promise((resolve) => {
      console.log(todo)
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
      resolve();
    }).then(() => this.filterTodo(this.state.filter));
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addTodo={this.addTodo} config={config} />
        <TodoList
          todos={this.state.filterTodos}
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
