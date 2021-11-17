
function Todo(props) {
  const todo = props.todo;
  const completeTodo = props.completeTodo;
  const archiveTodo = props.archiveTodo;
  const setTodoToEdit = props.setTodoToEdit;
  const deleteTodo = props.deleteTodo;

  return (
    <div className="todo">

      <div className="description">{ todo.description }</div>

      <div className="due-date">{ todo.duedate.substring(0, 10) }</div>
      
      <div className="options">
        <button
          className="btn btn-complete"
          disabled={ todo.hide }
          onClick={ () => completeTodo(todo._id) }
        >
          { (todo.done ? 'Refazer' : 'Concluir') }
        </button>
        
        <button
          className="btn btn-edit"
          disabled={ todo.hide || todo.done}
          onClick={ () => setTodoToEdit({
            id: todo._id,
            description: todo.description,
            duedate: todo.duedate
        }) }
        >
          Editar
        </button>
        
        <button 
          className="btn btn-archive"
          disabled={ !todo.done || todo.hide }
          onClick={ () => archiveTodo(todo._id) }
        >
          Arquivar
        </button>
        
        <button
          className="btn btn-delete"
          onClick={ () => deleteTodo(todo._id) }
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default Todo;