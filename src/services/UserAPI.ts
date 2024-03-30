import { octokit } from '../../environments/apiKey';
import { IUserSearchResponse } from '../models';

const baseUrl: string = `https://api.github.com/`;

export async function getUser(username: string): Promise<IUserSearchResponse> {
  try {
    const response = await octokit.request<IUserSearchResponse>({
      method: 'GET',
      url: `${baseUrl}users/${username}`,
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch user data for ${username}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
