
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
          { (todo.done ? 'Reativar' : 'Completar') }
        </button>
        
        <button
          className="btn btn-edit"
          disabled={ todo.hide }
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
          disabled={ !todo.done }
          onClick={ () => archiveTodo(todo._id) }
        >
          { (todo.hide ? 'Desarquivar' : 'Arquivar') }
        </button>
        
        <button
          className="btn btn-delete"
          disabled={ todo.hide }
          onClick={ () => deleteTodo(todo._id) }
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default Todo;