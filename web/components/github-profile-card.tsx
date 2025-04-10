import Image from "next/image";
import { HiOutlineMap, HiOutlineCalendar, HiOutlineLink } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils";

interface ProfileCardProps {
  profile: {
    avatar_url: string;
    name: string;
    login: string;
    bio: string;
    location?: string;
    blog?: string;
    created_at: string;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
  };
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 rounded-full">
              <Image
                src={profile.avatar_url}
                alt={profile.name || profile.login}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {profile.name || profile.login}
            </h2>
            <p className=" mb-2">@{profile.login}</p>

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

            <div className="flex gap-4">
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
