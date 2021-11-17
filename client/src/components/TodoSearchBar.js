import { useState } from "react";

function TodoSearchBar(props) {
  const [inputSearch, setInputSearch] = useState("");

  const handleInputSearchChange = e => {
    setInputSearch(e.target.value);
  };

  const handleSearch = () => {        
    const inputToSearch = inputSearch.replace(/\s+/g, ' ').trim();
    
    setInputSearch(inputSearch.replace(/\s+/g, ' ').trim());

    if (inputToSearch) {
      props.onSearch(inputToSearch);
    }
  };

  const handleCancel = () => {
    props.onCancel();

    setInputSearch("");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por descrição..."
        value={ inputSearch }
        onChange={ handleInputSearchChange }
      />
      
      <button
        onClick={ handleSearch }
      >Pesquisar</button>
      
      <button
        onClick={ handleCancel }
      >Cancelar</button>
    </div>      
  );
}

export default TodoSearchBar;