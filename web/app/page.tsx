import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-extrabold text-3xl text-center md:text-4xl lg:text-5xl">
        <span className="text-indigo-500">Easily</span> inspect your GitHub
        profile
      </h1>
      <p className="text-center">
        Enter a GitHub username to see their profile and top repositories.
      </p>

      <div className="flex gap-2 mx-auto w-full max-w-lg">
        <Input
          placeholder="Search your GitHub username . . ."
          className="flex-1"
        />
        <Button>Search</Button>
      </div>
    </div>
  );
}
