export interface IContributorResponse {
  login: string;
  id: number;
  avatar_url: string;
  contributions: number;
}

export interface IContributor {
  name: string;
  avatar: string;
  contributions: number;
}
