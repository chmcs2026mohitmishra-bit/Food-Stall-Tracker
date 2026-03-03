const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    className="input input-bordered w-full mb-4"
    placeholder="Search by shop or food..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
);

export default SearchBar;
