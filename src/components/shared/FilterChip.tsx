interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      className={`filter-chip ${isActive ? 'filter-chip--active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default FilterChip;