import { IRepositoryResponse, IOrganisationResponse, ICommitResponse, ICommit, IUserSearchResponse, IRepository } from '../models'
import { octokit } from '../../environments/apiKey';
import { format } from 'date-fns';

const username: string = 'aaronabramov'; // will dynamically change the user later (fron state)
const baseUrl: string = `https://api.github.com/`;

export async function getRepos(owner: string): Promise<IRepository[]> {
  const response = await octokit.request(`${baseUrl}users/${owner}/repos`);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch repositories for username ${owner}`);
  }

  const repoDataArray: IRepositoryResponse[] = response.data;

  const repositories: IRepository[] = repoDataArray
    .filter(
      (repo) =>
        repo.id && repo.name && repo.full_name && repo.owner
    )
    .map((repo) => {
      const timestamp = repo.updated_at ? new Date(repo.updated_at) : new Date();

      // Format the timestamp
      const formattedDate = format(timestamp, 'dd MMMM yyyy');

      if (!repo.language){
        repo.language = "Unknown";
      }

      const repository: IRepository = {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        owner: repo.owner,
        description: repo.description,
        updatedTime: formattedDate,
        language: repo.language,
      }
      return repository;
    });

  return repositories;
}

export async function getOrgs(owner: string): Promise<IOrganisationResponse[]> {  
  const response = await octokit.request(`${baseUrl}users/${owner}/orgs`);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch organisations for username ${owner}`);
  }


  const orgData: IOrganisationResponse[] = response.data;
  return orgData;
}
// can i use a filter here?


  export function getOrgRepos(org: string): void {
    //need to get the url from getOrgs' response
  }

export async function getCommits(owner: string, repo: string): Promise<ICommit[]> {
  const response = await octokit.request(`${baseUrl}repos/${owner}/${repo}/commits?per_page=100`);
  const commitData: ICommitResponse[] = response.data;

  const allCommits: ICommit[] = commitData?.map(commitData => {
    let commitType: 'initial' | 'merge' | 'commit' | 'branch';
    switch (commitData.parents.length) {
      case 0:
        commitType = 'initial';
        break;
      case 1:
        commitType = 'commit';
        break;
      case 2:
        commitType = 'merge';
        break;
      default:
        commitType = 'branch';
        break;
    }

    const dataValue: ICommit = {
      author: commitData.commit.author,
      message: commitData.commit.message,
      branches: commitData.parents.map(parent => parent.sha),
      date: commitData.commit.author?.date ? commitData.commit.author.date.substring(0,10) : "Unknown",
      type: commitType,
      id: commitData.sha.substring(0, 7)
    };  
    return dataValue;
  });

  return allCommits;
}

  export async function getUserSearch(username: string): Promise<IUserSearchResponse> {
    const response = octokit.request(`${baseUrl}users/${username}`);
    const userData : IUserSearchResponse= (await response).data;
    return userData;
  }

  export async function getUser(username: string): Promise<IUserSearchResponse> {
    const response = octokit.request(`${baseUrl}users/${username}`);
    const userData : IUserSearchResponse= (await response).data;
    return userData;
  }