import {
  IRepositoryResponse,
  IOrganisationResponse,
  ICommitResponse,
  ICommit,
  IUserSearchResponse,
  IRepository,
  IBuildStats,
  IWorkflowRuns,
  WorkflowRun,
  ILanguage,
  ILanguageResponse,
  ILanguageColors
} from '../models';
import { octokit } from '../../environments/apiKey';
import { format } from 'date-fns';
import { IIssue } from '../models/issues';
import { IContributor, IContributorResponse } from '../models/contributors';
import languageColors from '../json/languageColors.json';

const baseUrl: string = `https://api.github.com/`;

export async function getRepos(owner: string): Promise<IRepository[]> {
  const response = await octokit.request(`${baseUrl}users/${owner}/repos`);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch repositories for username ${owner}`);
  }

  const repoDataArray: IRepositoryResponse[] = response.data;

  const repositories: IRepository[] = repoDataArray
    .filter((repo) => repo.id && repo.name && repo.full_name && repo.owner)
    .map((repo) => {
      const timestamp = repo.updated_at
        ? new Date(repo.updated_at)
        : new Date();
      const formattedDate = format(timestamp, 'dd MMMM yyyy');

      if (!repo.language) {
        repo.language = 'Unknown';
      }

      const repository: IRepository = {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        owner: repo.owner,
        description: repo.description,
        updatedTime: formattedDate,
        language: repo.language,
      };
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

export async function getCommits(
  owner: string,
  repo: string,
): Promise<ICommit[]> {
  const response = await octokit.request(
    `${baseUrl}repos/${owner}/${repo}/commits?per_page=100`,
  );
  const commitData: ICommitResponse[] = response.data;

  const allCommits: ICommit[] = commitData?.map((commitData) => {
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
      author: commitData.author,
      message: commitData.commit.message,
      branches: commitData.parents.map((parent) => parent.sha),
      date: commitData.commit.author?.date
        ? commitData.commit.author.date.substring(0, 10)
        : 'Unknown',
      type: commitType,
      id: commitData.sha.substring(0, 7),
    };
    return dataValue;
  });

  return allCommits;
}

export async function getUserSearch(
  username: string,
): Promise<IUserSearchResponse> {
  const response = octokit.request(`${baseUrl}users/${username}`);
  const userData: IUserSearchResponse = (await response).data;
  return userData;
}

export async function getUser(username: string): Promise<IUserSearchResponse> {
  const response = octokit.request(`${baseUrl}users/${username}`);
  const userData: IUserSearchResponse = (await response).data;
  return userData;
}

export async function getOpenIssueCount(
  owner: string,
  repo: string,
): Promise<number> {
  const response = await octokit.request(
    `${baseUrl}repos/${owner}/${repo}/issues?state=open`,
  );
  if (response.status !== 200) {
    throw new Error(`Failed to fetch open issues for ${owner}/${repo}`);
  }
  return response.data.length;
}

export async function getClosedIssueCount(
  owner: string,
  repo: string,
): Promise<number> {
  const response = await octokit.request(
    `${baseUrl}repos/${owner}/${repo}/issues?state=closed`,
  );
  if (response.status !== 200) {
    throw new Error(`Failed to fetch open issues for ${owner}/${repo}`);
  }
  const userData: IIssue[] = response.data;
  return userData.length;
}

export async function getBuildStats(owner: string, repo: string): Promise<IBuildStats> {
  const response = await octokit.request(
    `${baseUrl}repos/${owner}/${repo}/actions/runs?status=completed&per_page=100`,
  );

  if (response.status !== 200) {
    throw new Error(`Failed to fetch open build stats for ${owner}/${repo}`);
  }

  const WorkflowRunsData: IWorkflowRuns = response.data;

  let initialBuildStats :  IBuildStats = {
    successes: 0,
    failures: 0,
  };
  
  const buildStats = WorkflowRunsData.workflow_runs.reduce(
    (acc: IBuildStats, build: WorkflowRun) => {
      if (build.conclusion?.includes("success")) {
        acc.successes++;
      } else {
        acc.failures++;
      }
      return acc;
    },
    initialBuildStats
  );

  return buildStats;
}

export async function getContributors(owner: string, repo: string): Promise<IContributor[]> {
  try {
    const response = await octokit.request(
      `${baseUrl}repos/${owner}/${repo}/contributors`
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch contributors');
    }

    const contributors: IContributor[] = response.data.map((contributor: IContributorResponse) => ({
      name: contributor.login,
      avatar: contributor.avatar_url,
      contributions: contributor.contributions,
    }));

    return contributors;
  } catch (error) {
    console.error('Error fetching contributors:', error);
    throw error;
  }
}

export async function getLanguageStats(owner: string, repo: string): Promise<ILanguage>{
  try {
    const response = await octokit.request(
      `${baseUrl}repos/${owner}/${repo}/languages`
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch languages');
    }

    if (response.data === null) {
      throw new Error('No languages found');
    }

    const responseData: ILanguageResponse = response.data;
    const languageColorsData: ILanguageColors = languageColors;
    const languageNames = Object.keys(responseData);
    const languageData = languageNames.map(language => responseData[language]);
    const languageColorsDataArray = languageNames.map(language => languageColorsData[language] ?? '#cccccc');

    const languageStats: ILanguage = {
      languages: languageNames,
      colors: languageColorsDataArray,
      percentages: languageData,
    };

    return languageStats;

  } catch (error) {
    throw error;
  }
}
