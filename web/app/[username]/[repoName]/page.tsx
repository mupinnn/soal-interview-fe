import {
  getGitHubUserRepoDetail,
  getGitHubUserRepoLanguages,
} from "@/lib/github";
import { GitHubRepoCard } from "@/components/github-repo-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLanguageColor } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string; repoName: string }>;
}) {
  const { username, repoName } = await params;
  const repoData = getGitHubUserRepoDetail({ username, repo_name: repoName });
  const repoLangData = getGitHubUserRepoLanguages({
    username,
    repo_name: repoName,
  });

  const [repo, repoLang] = await Promise.all([repoData, repoLangData]);

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <GitHubRepoCard repo={repo} />
      </a>

      <Card>
        <CardHeader>
          <CardTitle>Language used</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          {Object.entries(repoLang).map(([k]) => (
            <p className="inline-flex items-center gap-2" key={k}>
              <span className={`size-3 rounded-full ${getLanguageColor(k)}`} />
              <span>{k}</span>
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
