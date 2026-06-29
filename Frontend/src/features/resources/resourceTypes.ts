export const ResourceType = {
  Link: "Link",
  PDF: "PDF",
  Video: "Video",
} as const;

export type ResourceType = typeof ResourceType[keyof typeof ResourceType];

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  collectionId: string | null;
  tags: string[];
  quickNote: string;
  createdAt: string;
}
