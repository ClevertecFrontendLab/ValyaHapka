import { Category } from './category-state';

export interface SidebarProps {
  toggleCategories: (e: React.MouseEvent) => void;
  isOpenCategories: boolean;
  pathnameValidation: () => boolean;
  categories: Category[];
}
