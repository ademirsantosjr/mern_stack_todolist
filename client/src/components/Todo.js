
function Todo(props) {
  const todo = props.todo;
  const completeTodo = props.completeTodo;
  const deleteTodo = props.deleteTodo;

  return (
    <>
      <div>{ todo.description }</div>
      
      <div>{ todo.duedate }</div>
      
      <div onClick={ () => completeTodo(todo._id) }>
        { (todo.done ? 'reativar' : 'Completar') }
      </div>
      
      <div>Editar</div>
      
      <div>Arquivar</div>
      
      <div onClick={ () => deleteTodo(todo._id) }>Excluir</div>
    </>
  );
}

export default Todo;