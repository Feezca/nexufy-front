import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useLanguage from "../../themes/useLanguage";

const SearchBar = ({ searchQuery, setSearchQuery, darkMode }) => {
  const [debounceTimeOut, setDebounceTimeOut] = useState(null);
  const { t, language } = useLanguage();

  const handleInputSearch = (event) => {
    const value = event.target.value;

    if (debounceTimeOut) {
      clearTimeout(debounceTimeOut);
    }

    const timeout = setTimeout(() => {
      setSearchQuery(value);
    }, 0);
    setDebounceTimeOut(timeout);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex">
      <Form.Control
        type="text"
        placeholder={t.searchPlaceholder}
        className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
        aria-label={t.searchAriaLabel}
        value={searchQuery}
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
