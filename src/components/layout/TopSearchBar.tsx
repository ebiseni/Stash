import { useAppDispatch, useAppSelector } from '../../app/store';
import { setSearchQuery } from '../../features/resources/resourceSlice';

function TopSearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.resources.searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="topbar">
      <div className="topbar__search">
        <span className="topbar__search-icon"><img src="/public/search-icon.svg" alt="serach Icon" /></span>
        <input
          type="text"
          className="topbar__input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
        />
        {searchQuery && (
          <button className="topbar__clear" onClick={handleClear}>✕</button>
        )}
      </div>
    </div>
  );
}

export default TopSearchBar;