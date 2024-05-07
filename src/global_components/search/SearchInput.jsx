import './css/SearchInput.css';

const SearchInput = ({ placeholder, setSearchValue }) => {
  const setSearch = (e) => {
    if (!setSearchValue) return;
    setSearchValue(e.target.value);
  };

  return (
    <header className="search_container">
      <div className="search_box">
        <i className="icon-search"></i>
        <input
          className="search_input"
          id="searchInp"
          type="text"
          placeholder={placeholder}
          onChange={setSearch}
        />
      </div>
    </header>
  );
};

export default SearchInput;
