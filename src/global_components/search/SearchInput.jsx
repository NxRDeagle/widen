import './css/SearchInput.css';

const SearchInput = ({ placeholder }) => {
  return (
    <header className="search_container">
      <div className="search_box">
        <i className="icon-search"></i>
        <input className="search_input" type="text" placeholder={placeholder} />
      </div>
    </header>
  );
};

export default SearchInput;
