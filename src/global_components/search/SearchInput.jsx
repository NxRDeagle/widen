import './scss/SearchInput.scss';

const SearchInput = () => {
  return (
    <header className="search_container">
      <div className="search_box">
        <i className="icon-search"></i>
        <input className="search_input" type="text" placeholder="глобальный поиск" />
      </div>
    </header>
  );
};

export default SearchInput;
