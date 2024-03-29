import { octokit } from '../../environments/apiKey';
import { ICommit, ICommitResponse } from '../models';

const baseUrl: string = `https://api.github.com/`;

export async function getCommits(
  owner: string,
  repo: string,
): Promise<ICommit[]> {
  try {
    const response = await octokit.request(
      `${baseUrl}repos/${owner}/${repo}/commits?per_page=100`,
    );
    if (response.status !== 200) {
      throw new Error(`Failed to fetch commits for ${owner}/${repo}`);
    }

    const commitData: ICommitResponse[] = response.data;
    const allCommits: ICommit[] = commitData?.map(processCommitData);

    return allCommits;
  } catch (error) {
    console.error('Error fetching commits:', error);
    throw error;
  }
}

function processCommitData(commitData: ICommitResponse): ICommit {
  const commitType = getCommitType(commitData.parents.length);

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
}

function getCommitType(
  parentsLength: number,
): 'initial' | 'merge' | 'commit' | 'branch' {
  switch (parentsLength) {
    case 0:
      return 'initial';
    case 1:
      return 'commit';
    case 2:
      return 'merge';
    default:
      return 'branch';
  }
}
