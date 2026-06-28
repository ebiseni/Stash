import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Resource, ResourceType } from "../features/resources/resourceTypes";
import type { Collection } from "../features/collections/collectionSlice";

interface AppContextType {
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;

  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;

  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;

  selectedType: ResourceType | "All";
  setSelectedType: React.Dispatch<
    React.SetStateAction<ResourceType | "All">
  >;

  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  editingResource: Resource | null;
  setEditingResource: React.Dispatch<
    React.SetStateAction<Resource | null>
  >;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceType | "All">("All");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editingResource, setEditingResource] =
    useState<Resource | null>(null);

  return (
    <AppContext.Provider
      value={{
        resources,
        setResources,

        collections,
        setCollections,

        searchQuery,
        setSearchQuery,

        selectedType,
        setSelectedType,

        isAddModalOpen,
        setIsAddModalOpen,

        isEditModalOpen,
        setIsEditModalOpen,

        editingResource,
        setEditingResource,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}