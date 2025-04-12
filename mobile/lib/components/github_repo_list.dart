import 'package:flutter/material.dart';
import "package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart";
import "package:mobile/lib/github.dart";
import 'github_repo_card.dart';

class GitHubRepoList extends StatelessWidget {
  final Future<List<GitHubUserRepo>> reposFuture;

  const GitHubRepoList({super.key, required this.reposFuture});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<GitHubUserRepo>>(
      future: reposFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return GitHubRepoListSkeleton();
        } else if (snapshot.hasError) {
          return Center(child: Text('Error loading repositories'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return Center(child: Text('No repositories found'));
        } else {
          final repos = snapshot.data!;
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  'Top 10 Repositories',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ),
              StaggeredGrid.count(
                crossAxisCount: 1,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
                children: repos.map<Widget>((item) {
                  return GitHubRepoCard(repo: item);
                }).toList(),
              ),
            ],
          );
        }
      },
    );
  }
}

class GitHubRepoListSkeleton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 8,
        crossAxisSpacing: 8,
      ),
      itemCount: 10,
      itemBuilder: (context, index) {
        return Container(
          width: double.infinity,
          height: 80,
          color: Colors.grey[300],
        );
      },
    );
  }
}
