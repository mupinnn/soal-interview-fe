import { LuStar, LuGitFork } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getGitHubUserRepos } from "@/lib/github";

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

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      "C#": "bg-purple-500",
      PHP: "bg-indigo-400",
      Ruby: "bg-red-600",
      Go: "bg-blue-400",
      Rust: "bg-orange-600",
      Swift: "bg-orange-500",
      Kotlin: "bg-purple-400",
      Dart: "bg-blue-300",
    };

    return colors[language || ""] || "bg-gray-400";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Top 10 Repositories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {repos.map((repo) => (
          <Card key={repo.id}>
            <CardHeader>
              <CardTitle>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {repo.name}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {repo.description && (
                <p className="mb-4 wrap-break-word">{repo.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`size-3 rounded-full ${getLanguageColor(repo.language)}`}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <LuStar className="h-4 w-4" />
                  <span>{repo.stargazers_count}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <LuGitFork className="h-4 w-4" />
                  <span>{repo.forks_count}</span>
                </div>

                <p>
                  Updated on {formatDate(repo.updated_at, { month: "short" })}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
