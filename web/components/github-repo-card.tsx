import { LuStar, LuGitFork } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, getLanguageColor } from "@/lib/utils";
import { type GitHubUserRepo } from "@/lib/github";

export function GitHubRepoCard({ repo }: { repo: GitHubUserRepo }) {
  return (
    <Card key={repo.id}>
      <CardHeader>
        <CardTitle>{repo.name}</CardTitle>
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

          <p>Updated on {formatDate(repo.updated_at, { month: "short" })}</p>
        </div>
      </CardContent>
    </Card>
  );
}
