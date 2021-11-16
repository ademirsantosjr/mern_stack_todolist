import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:5000/api/v1";

function App() {
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
  
  return (
    <div className="App">
      <h1>To-Do List App</h1>

      <div className="todos">
        {todos.map(todo => (
          <div className={ "todo " + (todo.done ? "is-done" : "") }
               key={ todo._id }>

            <div className="bordered checkbox">{ (todo.done ? 'X' : '-') }</div>

            <div className="bordered description">{ todo.description }</div>

            <div className="bordered limit-date">{ todo.duedate }</div>

            <div className="bordered to-complete"
                 onClick={ () => completeTodo(todo._id) }>Completar</div>

            <div className="bordered edit">Editar</div>

            <div className="bordered archive">Arquivar</div>

            <div className="bordered detele-todo">Excluir</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
