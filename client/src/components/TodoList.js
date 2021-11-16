import { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const API_BASE = "http://localhost:5000/api/v1";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error: ", err));
  }

  const createTodo = async (description, duedate) => {
    const data = await fetch(API_BASE + "/todos/new", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: description,
        duedate: duedate
      })
    }).then(res => res.json());

    setTodos([...todos, data]);
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todos/update/done/" + id, {
      method: 'PATCH'
    }).then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.done = data.done;
      }

      return todo;
    }));
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todos/delete/" + id, {
      method: 'DELETE'
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  return (
    <div>
      <TodoForm onSubmit={ createTodo }/>
      {todos.map((todo, index) => (
        <Todo 
          todo={ todo }
          completeTodo={ completeTodo }
          deleteTodo={ deleteTodo }
          key={ index }
        />
      ))}
    </div>
  );
}

export default TodoList;
