import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage

const SearchBar = ({ searchQuery, setSearchQuery, darkMode }) => {
  const [debounceTimeOut, setDebounceTimeOut] = useState(null);
  const { t, language } = useLanguage(); // Obtener las traducciones directamente con el hook

  const handleInputSearch = (event) => {
    const value = event.target.value;

    // Limpiar el temporizador anterior para activar la búsqueda en tiempo real
    if (debounceTimeOut) {
      clearTimeout(debounceTimeOut);
    }

    // Crear un nuevo temporizador para la búsqueda
    const timeout = setTimeout(() => {
      setSearchQuery(value); // Actualiza el query de búsqueda en el componente padre
    }, 0);
    setDebounceTimeOut(timeout);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (searchQuery) {
      setSearchQuery(searchQuery); // Asegúrate de enviar el valor al padre
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex">
      <Form.Control
        type="text"
        placeholder={t.searchPlaceholder}
        className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
        aria-label={t.searchAriaLabel}
        value={searchQuery} // Mantiene el control del valor del input
        onChange={handleInputSearch}
      />
      <Button
        className="mx-2"
        variant={darkMode ? "outline-light" : "outline-primary"}
        type="submit"
      >
        <i className="bi bi-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBar;
