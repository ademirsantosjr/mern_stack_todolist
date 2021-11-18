
function Todo(props) {
  const todo = props.todo;
  const completeTodo = props.completeTodo;
  const archiveTodo = props.archiveTodo;
  const setTodoToEdit = props.setTodoToEdit;
  const deleteTodo = props.deleteTodo;

  return (
    <tr className="todo">

      <td className={ todo.done ? "is-done" : "" }>{ todo.description }</td>

      <td className={ todo.done ? "is-done" : "" }>{ todo.duedate.substring(0, 10) }</td>
      
      <td className="todo-options">
        <button
          className="btn btn-options btn-complete-todo"
          disabled={ todo.hide }
          onClick={ () => completeTodo(todo._id) }
        >
          { (todo.done ? 'Refazer' : 'Concluir') }
        </button>
        
        <button
          className="btn btn-options btn-edit-todo"
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
          className="btn btn-options btn-archive-todo"
          disabled={ !todo.done || todo.hide }
          onClick={ () => archiveTodo(todo._id) }
        >
          Arquivar
        </button>
        
        <button
          className="btn btn-options btn-delete-todo"
          onClick={ () => deleteTodo(todo._id) }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

export default Todo;