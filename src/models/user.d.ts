export interface IUserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: UserSearchResultItem[];
}

interface UserSearchResultItem {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
}
