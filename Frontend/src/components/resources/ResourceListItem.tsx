import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import {
  openEditModal,
  setResources,
} from "../../features/resources/resourceSlice";
import {
  deleteResource as deleteResourceApi,
  getResources,
} from "../../api";
import type { Resource } from "../../features/resources/resourceTypes";
import TagChip from "../shared/TagChip";

interface ResourceListItemProps {
  resource: Resource;
  tableView?: boolean;
  collectionName?: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function ResourceListItem({
  resource,
  tableView = false,
  collectionName,
}: ResourceListItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEdit = () => {
    dispatch(openEditModal(resource));
    setMenuOpen(false);
  };

  const handleDelete = async () => {
  try {
    await deleteResourceApi(resource.id);

    const resources = await getResources();

    dispatch(setResources(resources));
    setMenuOpen(false);
  } catch (error) {
    console.error("Failed to delete resource:", error);
  }
};
  if (tableView) {
    return (
      <tr className="resource-table__row">
        <td className="resource-table__cell">
          <div className="resource-table__title-cell">
            <span className="resource-list__icon">
              <img src="/file-icon.svg" alt="" />
            </span>
            <div>
              <div className="resource-list__title">{resource.title}</div>
              <div className="resource-list__url">{resource.url}</div>
            </div>
          </div>
        </td>
        <td className="resource-table__cell">
          <span className="resource-type-badge">{resource.type}</span>
        </td>
        <td className="resource-table__cell resource-table__muted">
          {collectionName ?? "—"}
        </td>
        <td className="resource-table__cell">
          <div className="resource-list__tags">
            {resource.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </td>
        <td className="resource-table__cell resource-table__muted">
          {timeAgo(resource.createdAt)}
        </td>
        <td className="resource-table__cell">
          <div className="resource-list__menu-wrapper">
            <button
              className="resource-list__menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Options"
            >
              ⋯
            </button>
            {menuOpen && (
              <div className="resource-list__dropdown">
                <button onClick={handleEdit}>✏️ Edit</button>
                <button
                  onClick={handleDelete}
                  className="resource-list__dropdown-delete"
                >
                  🗑 Delete
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <li
      className="resource-list__item"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/resources/${resource.id}`)}
    >
      <span className="resource-list__icon">
        <img src="/file-icon.svg" alt="" />
      </span>
      <div className="resource-list__body">
        <span className="resource-list__title">{resource.title}</span>
        <span className="resource-list__url">{resource.url}</span>
        <div className="resource-list__tags">
          {resource.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      </div>
      <span className="resource-type-badge">{resource.type}</span>
      <span className="resource-list__time">{timeAgo(resource.createdAt)}</span>
      <div
        className="resource-list__menu-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="resource-list__menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Options"
        >
          ⋯
        </button>
        {menuOpen && (
          <div className="resource-list__dropdown">
            <button onClick={handleEdit}>✏️ Edit</button>
            <button
              onClick={handleDelete}
              className="resource-list__dropdown-delete"
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default ResourceListItem;
