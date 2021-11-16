import {useState} from 'react';

function TodoForm(props) {
  const [inputDescription, setInputDescription] = useState("");
  const [inputDueDate, setInputDueDate] = useState("");

  const handleDescriptionChange = e => {
    setInputDescription(e.target.value);
  };

  const handleDueDateChange = e => {
    setInputDueDate(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit(inputDescription, inputDueDate);

    setInputDescription("");
    setInputDueDate("");
  };

  return (
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

      <button>Adicionar</button>
    </form>
  )
}

export default TodoForm;