export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubUserRepo {
  id: string;
  name: string;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage?: string | null;
  language?: string | null;
  forks_count?: number;
  stargazers_count?: number;
  created_at: string;
  updated_at: string;
}

const githubApiBaseURL = "https://api.github.com";

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`${githubApiBaseURL}/users/${username}`);

  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  return response.json();
}

export async function getGitHubUserRepos(
  username: string,
): Promise<GitHubUserRepo[]> {
  const response = await fetch(
    `${githubApiBaseURL}/search/repositories?q=user:${username}&sort=stars&order=desc`,
  );

  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  type JsonResponse = {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubUserRepo[];
  };

  const json: JsonResponse = await response.json();

  return json.items.slice(0, 10);
}

type GitHubRepoDetailParams = {
  username: string;
  repo_name: string;
};

export async function getGitHubUserRepoDetail({
  username,
  repo_name,
}: GitHubRepoDetailParams): Promise<GitHubUserRepo> {
  const response = await fetch(
    `${githubApiBaseURL}/repos/${username}/${repo_name}`,
  );

  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  return response.json();
}

export async function getGitHubUserRepoLanguages({
  username,
  repo_name,
}: GitHubRepoDetailParams): Promise<{ [k: string]: number }> {
  const response = await fetch(
    `${githubApiBaseURL}/repos/${username}/${repo_name}/languages`,
  );

  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  return response.json();
}
