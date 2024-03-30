import { octokit } from '../../environments/apiKey';
import {
  IBuildStats,
  IContributor,
  IContributorResponse,
  IIssue,
  ILanguage,
  ILanguageColors,
  ILanguageResponse,
  IWorkflowRuns,
  WorkflowRun,
} from '../models';
import languageColors from '../json/languageColors.json';

const baseUrl: string = `https://api.github.com/repos/`;

async function makeApiRequest<T>(url: string): Promise<T> {
  try {
    const response = await octokit.request<T>({
      method: 'GET',
      url: url,
    })
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function getOpenIssueCount(
  owner: string,
  repo: string,
): Promise<number> {
  const data: IIssue[] = await makeApiRequest(
    `${baseUrl}${owner}/${repo}/issues?state=open`,
  );
  return data.length;
}

export async function getClosedIssueCount(
  owner: string,
  repo: string,
): Promise<number> {
  const data: IIssue[] = await makeApiRequest(
    `${baseUrl}${owner}/${repo}/issues?state=closed`,
  );
  return data.length;
}

export async function getBuildStats(
  owner: string,
  repo: string,
): Promise<IBuildStats> {
  const data: IWorkflowRuns = await makeApiRequest(
    `${baseUrl}${owner}/${repo}/actions/runs?status=completed&per_page=100`,
  );

  const initialBuildStats: IBuildStats = { successes: 0, failures: 0 };
  const buildStats = data.workflow_runs.reduce(
    (acc: IBuildStats, build: WorkflowRun) => {
      if (build.conclusion?.includes('success')) {
        acc.successes++;
      } else {
        acc.failures++;
      }
      return acc;
    },
    initialBuildStats,
  );

  return buildStats;
}

export async function getContributors(
  owner: string,
  repo: string,
): Promise<IContributor[]> {
  const data: IContributorResponse[] = await makeApiRequest(
    `${baseUrl}${owner}/${repo}/contributors`,
  );
  return data.map((contributor: IContributorResponse) => ({
    name: contributor.login,
    avatar: contributor.avatar_url,
    contributions: contributor.contributions,
  }));
}

export async function getLanguageStats(
  owner: string,
  repo: string,
): Promise<ILanguage> {
  const data: ILanguageResponse = await makeApiRequest(
    `${baseUrl}${owner}/${repo}/languages`,
  );

  if (!data) {
    throw new Error('No language data found');
  }

  const languageNames = Object.keys(data);
  const languageColorsData: ILanguageColors = languageColors;
  const languageData = languageNames.map((language) => data[language]);
  const languageColorsDataArray = languageNames.map(
    (language) => languageColorsData[language] ?? '#cccccc',
  );

  return {
    languages: languageNames,
    colors: languageColorsDataArray,
    percentages: languageData,
  };
}
