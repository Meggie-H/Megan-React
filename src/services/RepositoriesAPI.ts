import { octokit } from '../../environments/apiKey';
import {
  IRepositoryResponse,
  IRepository,
} from '../models';
import { format } from 'date-fns';

const baseUrl: string = `https://api.github.com/`;

export async function getRepos(owner: string): Promise<IRepository[]> {
  try {
    const response = await octokit.request<IRepositoryResponse[]>({
      method: 'GET',
      url: `${baseUrl}users/${owner}/repos`,
    });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch repositories for username ${owner}`);
    }

    const repoDataArray: IRepositoryResponse[] = response.data;

    const repositories: IRepository[] = repoDataArray
      .filter((repo) => repo.id && repo.name && repo.full_name && repo.owner)
      .map((repo) => processRepository(repo));

    return repositories;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

function processRepository(repo: IRepositoryResponse): IRepository {
  const timestamp = repo.updated_at ? new Date(repo.updated_at) : new Date();
  const formattedDate = format(timestamp, 'dd MMMM yyyy');

  const language = repo.language ? repo.language : 'Unknown';

  const repository: IRepository = {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner,
    description: repo.description,
    updatedTime: formattedDate,
    language: language,
  };

  return repository;
}