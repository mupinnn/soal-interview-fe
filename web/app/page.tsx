import { Suspense } from "react";
import { Search } from "@/components/search";
import {
  GitHubProfileCard,
  GitHubProfileCardSkeleton,
} from "@/components/github-profile-card";
import {
  GitHubRepoList,
  GitHubRepoListSkeleton,
} from "@/components/github-repo-list";
import { ErrorBoundary } from "@/components/error-boundary";

export default async function Home(props: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = (searchParams.query || "").trim();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-extrabold text-3xl text-center md:text-4xl lg:text-5xl">
        <span className="text-indigo-500">Easily</span> inspect your GitHub
        profile
      </h1>
      <p className="text-center">
        Enter a GitHub username to see their profile and top repositories.
      </p>

      <Search placeholder="Search your GitHub username . . ." />

      {query && (
        <div className="space-y-8 mt-4">
          <ErrorBoundary
            fallback={
              <p className="text-center text-red-500">
                Could not load GitHub profile. Either not found or server error.
              </p>
            }
          >
            <Suspense
              key={`profile-${query}`}
              fallback={<GitHubProfileCardSkeleton />}
            >
              <GitHubProfileCard query={query} />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={
              <p className="text-center text-red-500">
                Could not load GitHub profile repositories. Either not found or
                server error.
              </p>
            }
          >
            <Suspense
              key={`repo-list-${query}`}
              fallback={<GitHubRepoListSkeleton />}
            >
              <GitHubRepoList query={query} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
