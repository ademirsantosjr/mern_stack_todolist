import { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import TodoSearchBar from "./TodoSearchBar";

const API_BASE = "http://localhost:5000/api/v1/todos";

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
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error retrieving active Todos: ", err));
  }

  const getAllArchived = () => {
    fetch(API_BASE + "/archived")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error retrieving Archived Todos: ", err) );
  }

  const searchForTodos = description => {
    fetch(API_BASE + "/" + description)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error searching Todos: ", err) );
  }

  const createTodo = async (description, duedate) => {
    const data = await fetch(API_BASE + "/new", {
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
    await fetch(API_BASE + "/update/" + id, {
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
    const data = await fetch(API_BASE + "/update/done/" + id, {
      method: 'PATCH'
    }).then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.done = data.done;
      }

      return todo;
    }));
  }

  const archiveTodo = async id => {
    const data = await fetch(API_BASE + "/update/archive/" + id, {
      method: 'PATCH'
    }).then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.hide = data.hide;
      }

      return todo;
    }));

    setTodos(todos => todos.filter(todo => !todo.hide));
  }

  const deleteTodo = async id => {
    const canDelete = window.confirm("Deseja Excluir a Tarefa?");

    if (canDelete) {
      const data = await fetch(API_BASE + "/delete/" + id, {
        method: 'DELETE'
      }).then(res => res.json());      

      setTodos(todos => todos.filter(todo => todo._id !== data._id));
    }
  }

  const sortedTodosByDate = todos.sort((a, b) =>{
    return (
      new Date (a.duedate) - new Date (b.duedate)
    );
  });

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
    <div className="todo-list">
      <TodoForm todoToEdit={ todoToEdit } onSubmit={ createTodo }/>
      
      <TodoSearchBar
        onSearch={ searchForTodos }
        onCancel={ getTodos }
        onShowArchived={ getAllArchived }
      />

      <table className="todo-table">
      <tbody>
      <tr>
        <th>Descrição</th>
        <th>Vencimento</th>
        <th>Opções</th>
      </tr>      
      {sortedTodosByDate.map((todo, index) => (      
        <Todo 
          todo={ todo }
          completeTodo={ completeTodo }
          deleteTodo={ deleteTodo }
          setTodoToEdit={ setTodoToEdit }
          archiveTodo={ archiveTodo }
          key={ index }
        />
      ))}
      </tbody>
      </table>
    </div>
  );
}

export default TodoList;