import 'package:flutter/material.dart';
import 'package:mobile/lib/github.dart';

class GitHubProfileCard extends StatelessWidget {
  final Future<GitHubUserProfile> profileFuture;

  const GitHubProfileCard({super.key, required this.profileFuture});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<GitHubUserProfile>(
      future: profileFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Text("Loading");
        } else if (snapshot.hasError) {
          return Center(child: Text("Error loading profile"));
        } else if (!snapshot.hasData) {
          return Center(child: Text("No profile found"));
        } else {
          final profile = snapshot.data!;
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 32,
                        backgroundImage: NetworkImage(profile.avatarUrl),
                      ),
                      SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(profile.name ?? profile.login,
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 20)),
                            Text('@${profile.login}'),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  if (profile.bio != null) Text(profile.bio!),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildStat('Followers', profile.followers),
                      _buildStat('Following', profile.following),
                      _buildStat('Repositories', profile.publicRepos),
                    ],
                  ),
                ],
              ),
            ),
          );
        }
      },
    );
  }

  Widget _buildStat(String title, int value) {
    return Column(
      children: [
        Text(value.toString(),
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        Text(title, style: TextStyle(color: Colors.grey[600])),
      ],
    );
  }
}
