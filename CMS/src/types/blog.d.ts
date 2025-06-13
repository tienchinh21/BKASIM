export interface IBlog {
  id: string;
  title: string;
  summary: string;
  content: string;
  image?: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  authorCMSId?: string;
  authorCMS?: {
    id: string;
    name: string;
  };
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
}
