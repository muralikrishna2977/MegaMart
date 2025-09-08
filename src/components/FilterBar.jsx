import "./FilterBar.css";
import ClearFilters from "../assets/clearFilters.svg";
export default function FilterBar({ filters, setFilters }) {

  const handleClearFilters = () => {
    setFilters({ category: "", minPrice: Number(0), maxPrice: Number(100000) });
  };

  return (
    <aside className="filter-bar">
      <div className="filter-bar-header">
        <h3>Filters</h3>
        <img title="Clear Filters" onClick={handleClearFilters} src={ClearFilters} width="25px" height="25px" />
      </div>
      <label>Category</label>
      <select
        className="filter-select"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Home">Home</option>
      </select>

      <label>Min Price</label>
      <input
        type="number"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
      />
      <label>Max Price</label>
      <input
        type="number"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
      />

    </aside>
  );
}
