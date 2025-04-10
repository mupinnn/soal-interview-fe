import { LuStar, LuGitFork, LuCircle } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface RepoListProps {
  repos: Repo[];
}

export function RepoList({ repos }: RepoListProps) {
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
      <h2 className="text-2xl font-bold">Top Repositories</h2>
      <div className="grid grid-cols-1 gap-4">
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
              {repo.description && <p className="mb-4">{repo.description}</p>}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <LuCircle
                      className={`h-3 w-3 ${getLanguageColor(repo.language)}`}
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
