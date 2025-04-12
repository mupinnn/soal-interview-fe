import "package:flutter/material.dart";
import "package:mobile/components/ui/input.dart";
import "package:mobile/components/github_profile_card.dart";
import "package:mobile/components/github_repo_list.dart";
import "package:mobile/lib/github.dart";

class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Future<GitHubUserProfile>? futureProfile;
  Future<List<GitHubUserRepo>>? futureRepos;

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
              onSubmitted: (v) {
                setState(() {
                  futureProfile = getGitHubUser(v);
                  futureRepos = getGitHubUserRepos(v);
                });
              },
            ),
            SizedBox(height: 16),
            Expanded(
              child: ListView(children: [
                if (futureProfile != null)
                  GitHubProfileCard(
                    profileFuture: Future.value(futureProfile),
                  ),
                if (futureProfile != null)
                  GitHubRepoList(
                    reposFuture: Future.value(futureRepos),
                  )
              ]),
            )
          ],
        ),
      ),
    );
  }
}
