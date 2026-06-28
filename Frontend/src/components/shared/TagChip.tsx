interface TagChipProps {
  tag: string;
  onClick?: () => void;
}

function TagChip({ tag, onClick }: TagChipProps) {
  return (
    <span
      className={`tag-chip ${onClick ? 'tag-chip--clickable' : ''}`}
      onClick={onClick}
    >
      #{tag}
    </span>
  );
}

export default TagChip;