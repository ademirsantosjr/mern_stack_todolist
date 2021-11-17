import { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const API_BASE = "http://localhost:5000/api/v1";

function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const [todoToEdit, setTodoToEdit] = useState({
    id: null,
    description: "",
    duedate: ""
  });

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

  const updateTodo = async (id, description, duedate) => {
    await fetch(API_BASE + "/todos/update/" + id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: description,
        duedate: duedate
      })
    }).then(res => res.json());

    getTodos();
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
    const canDelete = window.confirm("Deseja Excluir Esta Tarefa?");

    if (canDelete) {
      const data = await fetch(API_BASE + "/todos/delete/" + id, {
        method: 'DELETE'
      }).then(res => res.json());      

      setTodos(todos => todos.filter(todo => todo._id !== data._id));
    }
  }

  if (todoToEdit.id) {
    return (
      <TodoForm
        todoToEdit={ todoToEdit }
        setTodoToEdit={ setTodoToEdit }
        onSubmit={ updateTodo }
      />
    );
  }

  return (
    <div>
      <TodoForm todoToEdit={ todoToEdit } onSubmit={ createTodo }/>
      {todos.map((todo, index) => (
        <Todo 
          todo={ todo }
          completeTodo={ completeTodo }
          deleteTodo={ deleteTodo }
          setTodoToEdit = { setTodoToEdit }
          key={ index }
        />
      ))}
    </div>
  );
}

export default TodoList;
