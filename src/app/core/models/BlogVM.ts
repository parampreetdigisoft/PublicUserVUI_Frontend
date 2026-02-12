export interface BlogVM {
  blogID: number;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  description: string;
  imageUrl: string;
  isActive:boolean;
  imageFile:string;
  updatedAt:string;
  expand?: boolean;
  showToggle?: boolean;
}
