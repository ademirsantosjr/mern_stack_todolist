import { useState } from "react";

function TodoSearchBar(props) {
  const [inputSearch, setInputSearch] = useState("");
  const [onlyArchived, setOnlyArchived] = useState(false);

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

  const handleShowArchived = () => {
    if (onlyArchived) {
      props.onCancel();
    } else {
      props.onShowArchived();
    }
    setOnlyArchived(!onlyArchived)
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
        className="btn btn-search-bar"
        onClick={ handleSearch }>Pesquisar</button>
      
      <button
        className="btn btn-search-bar"
        onClick={ handleCancel }>Cancelar</button>

      <button
        className="btn btn-search-bar"
        onClick={ handleShowArchived }>
        { onlyArchived ? "Mostrar Ativos" : "Mostrar Arquivados" }
      </button>
    </div>      
  );
}

export default TodoSearchBar;