
function Todo(props) {
  const todo = props.todo;
  const completeTodo = props.completeTodo;
  const setTodoToEdit = props.setTodoToEdit;
  const deleteTodo = props.deleteTodo;

  return (
    <div className="todo">

      <div className="description">{ todo.description }</div>

      <div className="due-date">{ todo.duedate.substring(0, 10) }</div>
      
      <div className="options">
        <button className="btn btn-complete" onClick={ () => completeTodo(todo._id) }>
          { (todo.done ? 'reativar' : 'Completar') }
        </button>
        
        <button
          className="btn btn-edit"
          onClick={ () => setTodoToEdit({
            id: todo._id,
            description: todo.description,
            duedate: todo.duedate
        }) }
        >
          Editar
        </button>
        
        <button className="btn btn-archive" disabled={ !todo.done }>Arquivar</button>
        
        <button className="btn btn-delete" onClick={ () => deleteTodo(todo._id) }>Excluir</button>
      </div>
    </div>
  );
}

export default Todo;