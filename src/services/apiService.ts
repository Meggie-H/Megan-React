import { IRepositoryResponse, IOrganisationResponse, ICommitResponse, ICommit } from '../models'
import { octokit } from '../../environments/apiKey';

const username: string = 'aaronabramov'; // will dynamically change the user later (fron state)
const baseUrl: string = `https://api.github.com/`;

export function getRepos(): void {
  fetch(baseUrl + `/users/${username}/repos`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.json() as Promise<IRepositoryResponse[]>;
    })
    .then(data => {
      console.log('Repos:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

export function getOrgs(): Promise<IOrganisationResponse> {  
    return fetch(baseUrl + `/users/${username}/orgs`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then(data => {
        console.log('Orgs:', data);
        return data;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
      });
  }

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