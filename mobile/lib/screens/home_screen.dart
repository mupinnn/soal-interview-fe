import "package:flutter/material.dart";
import "package:mobile/components/ui/input.dart";
import "package:mobile/components/github_profile_card.dart";
import "package:mobile/components/github_repo_card.dart";
import "package:mobile/components/github_repo_list.dart";

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final usernameController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: Text(
          "GetHub",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Center(
              child: RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w800,
                    fontSize: 32,
                  ),
                  children: [
                    TextSpan(
                      text: "Easily",
                      style: TextStyle(color: Colors.orange),
                    ),
                    TextSpan(text: " inspect your GitHub profile"),
                  ],
                ),
              ),
            ),
            SizedBox(height: 16),
            InputField(
              hintText: "Search your GitHub username . . .",
              controller: usernameController,
            ),
            SizedBox(height: 16),
            Expanded(
              child: ListView(
                children: [
                  GitHubProfileCard(profile: dummyProfile),
                  GitHubRepoList(
                    reposFuture: Future.value(dummyRepos),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

final dummyProfile = GitHubUserProfile(
  login: 'octocat',
  avatarUrl: 'https://github.com/images/error/octocat_happy.gif',
  name: 'The Octocat',
  bio: 'GitHub mascot',
  followers: 100,
  following: 10,
  publicRepos: 50,
);

final dummyRepos = List.generate(
  10,
  (index) => GitHubUserRepo(
    id: 'repo_$index',
    name: 'Repo $index',
    description: 'Description for repo $index',
    language: 'Dart',
    stargazersCount: index * 10,
    forksCount: index,
    updatedAt: '2025-04-11',
  ),
);
