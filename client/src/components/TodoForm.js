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
      <form onSubmit={ handleSubmit }>
        <input 
          type="text" 
          placeholder="Descreva a Tarefa"
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
          ? <button>Adicionar</button>
          : null
        }
      </form>
      
      {
        props.todoToEdit.id
        ? <button onClick={ handleSubmit }>Salvar</button>
        : null
      }

      { 
        props.todoToEdit.id
        ? <button onClick={ cancelEdit }>Cancelar</button>
        : null
      }
    </>
  )
}

export default TodoForm;