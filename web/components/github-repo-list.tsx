import Link from "next/link";
import { getGitHubUserRepos } from "@/lib/github";
import { GitHubRepoCard } from "./github-repo-card";

interface RepoListProps {
  query: string;
}

export function GitHubRepoListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(10).keys()].map((i) => (
        <div
          key={i}
          className="rounded w-full h-80 bg-gray-100 animate-pulse"
        ></div>
      ))}
    </div>
  );
}

export async function GitHubRepoList({ query }: RepoListProps) {
  const repos = await getGitHubUserRepos(query);

  if (repos.length === 0) {
    return <p className="text-center">No repositories found</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Top 10 Repositories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {repos.map((repo) => (
          <Link key={repo.id} href={`/${repo.owner.login}/${repo.name}`}>
            <GitHubRepoCard repo={repo} />
          </Link>
        ))}
      </div>
    </div>
  );
}
