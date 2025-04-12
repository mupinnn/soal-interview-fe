import 'package:flutter/material.dart';
import "package:mobile/lib/utils.dart";
import "package:mobile/lib/github.dart";

class GitHubRepoCard extends StatelessWidget {
  final GitHubUserRepo repo;

  const GitHubRepoCard({super.key, required this.repo});

  @override
  Widget build(BuildContext context) {
    return Card.outlined(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ListTile(
            title: Text(
              repo.name,
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(right: 16, left: 16, bottom: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (repo.description != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 8.0),
                    child: Text(
                      repo.description!,
                      style: TextStyle(fontSize: 14, color: Colors.grey[700]),
                    ),
                  ),
                Wrap(
                  spacing: 16,
                  runSpacing: 8,
                  children: [
                    if (repo.language != null)
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          CircleAvatar(
                            radius: 5,
                            backgroundColor: getLanguageColor(repo.language!),
                          ),
                          SizedBox(width: 8),
                          Text(repo.language!),
                        ],
                      ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.star, size: 16),
                        SizedBox(width: 4),
                        Text(repo.stargazersCount.toString()),
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.fork_right, size: 16),
                        SizedBox(width: 4),
                        Text(repo.forksCount.toString()),
                      ],
                    ),
                    Text(
                      'Updated on ${formatDate(repo.updatedAt)}',
                      style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
