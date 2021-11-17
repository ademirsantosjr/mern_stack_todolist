
function Todo(props) {
  const todo = props.todo;
  const completeTodo = props.completeTodo;
  const setTodoToEdit = props.setTodoToEdit;
  const deleteTodo = props.deleteTodo;

  return (
    <>
      <div>{ todo.description }</div>
      
      <div>{ todo.duedate }</div>
      
      <div onClick={ () => completeTodo(todo._id) }>
        { (todo.done ? 'reativar' : 'Completar') }
      </div>
      
      <div onClick={ () => setTodoToEdit({
        id: todo._id,
        description: todo.description,
        duedate: todo.duedate
      }) }>
        Editar
      </div>
      
      <div>Arquivar</div>
      
      <div onClick={ () => deleteTodo(todo._id) }>Excluir</div>
    </>
  );
}

export default Todo;