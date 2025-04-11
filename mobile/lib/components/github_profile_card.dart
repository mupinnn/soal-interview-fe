import 'package:flutter/material.dart';

class GitHubProfileCard extends StatelessWidget {
  final GitHubUserProfile profile;

  const GitHubProfileCard({super.key, required this.profile});

  @override
  Widget build(BuildContext context) {
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

class GitHubUserProfile {
  final String login;
  final String avatarUrl;
  final String? name;
  final String? bio;
  final int followers;
  final int following;
  final int publicRepos;

  GitHubUserProfile({
    required this.login,
    required this.avatarUrl,
    this.name,
    this.bio,
    required this.followers,
    required this.following,
    required this.publicRepos,
  });
}
