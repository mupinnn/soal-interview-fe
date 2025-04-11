import Image from "next/image";
import { HiOutlineMap, HiOutlineCalendar, HiOutlineLink } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getGitHubUser } from "@/lib/github";

interface ProfileCardProps {
  query: string;
}

export function GitHubProfileCardSkeleton() {
  return (
    <div className="rounded w-full max-w-3xl mx-auto h-60 bg-gray-100 animate-pulse"></div>
  );
}

export async function GitHubProfileCard({ query }: ProfileCardProps) {
  const profile = await getGitHubUser(query);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            width={128}
            height={128}
            className="flex-shrink-0 object-cover size-32 rounded-full border-2 border-indigo-900 shadow-[4px_4px_0_0_var(--color-indigo-900)]"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {profile.name || profile.login}
            </h2>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-2 hover:underline"
            >
              @{profile.login}
            </a>

            {profile.bio && <p className="mb-4">{profile.bio}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              {profile.location && (
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlineMap className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}

              {profile.blog && (
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlineLink className="h-4 w-4" />
                  <a
                    href={
                      profile.blog.startsWith("http")
                        ? profile.blog
                        : `https://${profile.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {profile.blog}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <HiOutlineCalendar className="h-4 w-4" />
                <span>Joined {formatDate(profile.created_at)}</span>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div>
                <span className="font-bold">{profile.followers}</span>
                <span className="ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold">{profile.following}</span>
                <span className="ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold">{profile.public_repos}</span>
                <span className="ml-1">Repositories</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
