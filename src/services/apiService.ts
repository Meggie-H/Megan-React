import { IMinimalRepository, OrganizationSimple, ICommitResponse } from '../models'

const username: string = 'aaronabramov'; // will dynamically change the user later (fron state)
const baseUrl: string = `https://api.github.com/users/${username}`;

export function getRepos(): void {
  fetch(baseUrl + '/repos')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.json() as Promise<IMinimalRepository[]>;
    })
    .then(data => {
      console.log('Repos:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

export function getOrgs(): Promise<OrganizationSimple> {  
    return fetch(baseUrl + '/orgs')
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

  export function getCommits(repo: string, owner: string): void {
    fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json() as Promise<ICommitResponse[]>;
      })
      .then(data => {
        console.log('Commits:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }