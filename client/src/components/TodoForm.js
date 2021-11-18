import {useState} from 'react';

function TodoForm(props) {
  const [inputDescription, setInputDescription] = useState(
    props.todoToEdit.id ? props.todoToEdit.description : ""
  );
  
  const [inputDueDate, setInputDueDate] = useState(
    props.todoToEdit.id ? props.todoToEdit.duedate.substring(0, 10) : ""
  );

  const handleDescriptionChange = e => {
    setInputDescription(e.target.value);
  };

  const handleDueDateChange = e => {
    setInputDueDate(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!inputDescription.trim()) {
      alert("Descreva a Tarefa!!");
      return;
    }

    if (!inputDueDate.trim()) {
      alert("Informe uma Data!!");
      return;
    }

    if (props.todoToEdit.id) {
      props.onSubmit(props.todoToEdit.id, inputDescription, inputDueDate);
      cancelEdit();
    } else {
      props.onSubmit(inputDescription, inputDueDate);
    }

    setInputDescription("");
    setInputDueDate("");
  };

  const cancelEdit = () => {
    props.setTodoToEdit({
      id: null,
      description: "",
      duedate: ""
    })
  };

  return (
    <>
      <form className="todo-form" onSubmit={ handleSubmit }>
        <input 
          type="text" 
          placeholder="Descreva a Tarefa"
          autoComplete="off"
          value={ inputDescription }
          name="text"
          onChange={ handleDescriptionChange }
        />

        <input 
          type="date" 
          value={ inputDueDate }
          name="date"
          onChange={ handleDueDateChange }
        />

        {
          !props.todoToEdit.id          
          ? <button className="btn" >Adicionar</button>
          : null
        }
      </form>
      
      {
        props.todoToEdit.id
        ? <button
            className="btn btn-editing-todo"
            onClick={ handleSubmit }>Salvar</button>
        : null
      }

      { 
        props.todoToEdit.id
        ? <button
            className="btn btn-canceling-todo"
            onClick={ cancelEdit }>Cancelar</button>
        : null
      }
    </>
  )
}

export default TodoForm;