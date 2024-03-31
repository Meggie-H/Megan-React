import { Octokit } from 'octokit';

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) throw new Error('Environment variable VITE_API_KEY is not found.');

export const octokit = new Octokit({ auth: apiKey });
