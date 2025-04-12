import "dart:convert";
import "package:http/http.dart" as http;

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

  factory GitHubUserProfile.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        "login": String login,
        "avatar_url": String avatarUrl,
        "name": String? name,
        "bio": String? bio,
        "followers": int followers,
        "following": int following,
        "public_repos": int publicRepos
      } =>
        GitHubUserProfile(
          login: login,
          avatarUrl: avatarUrl,
          name: name,
          bio: bio,
          followers: followers,
          following: following,
          publicRepos: publicRepos,
        ),
      _ => throw const FormatException("Failed to load GitHub profile"),
    };
  }
}

class GitHubUserRepo {
  final int id;
  final String name;
  final String? description;
  final String? language;
  final int stargazersCount;
  final int forksCount;
  final String updatedAt;

  GitHubUserRepo({
    required this.id,
    required this.name,
    this.description,
    this.language,
    required this.stargazersCount,
    required this.forksCount,
    required this.updatedAt,
  });

  factory GitHubUserRepo.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        "id": int id,
        "name": String name,
        "description": String? description,
        "language": String? language,
        "stargazers_count": int stargazersCount,
        "forks_count": int forksCount,
        "updated_at": String updatedAt
      } =>
        GitHubUserRepo(
          name: name,
          id: id,
          updatedAt: updatedAt,
          stargazersCount: stargazersCount,
          description: description,
          forksCount: forksCount,
          language: language,
        ),
      _ => throw const FormatException("Failed to load user repository"),
    };
  }
}

var githubApiBaseUrl = "https://api.github.com";

Future<GitHubUserProfile> getGitHubUser(String username) async {
  final response =
      await http.get(Uri.parse("$githubApiBaseUrl/users/$username"));

  if (response.statusCode == 200) {
    return GitHubUserProfile.fromJson(
        jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    throw Exception("Failed to load GitHub profile");
  }
}

class JsonResponse {
  final int totalCount;
  final bool incompleteResults;
  final List<GitHubUserRepo> items;

  JsonResponse({
    required this.totalCount,
    required this.incompleteResults,
    required this.items,
  });
}

Future<List<GitHubUserRepo>> getGitHubUserRepos(String username) async {
  final response = await http.get(Uri.parse(
      "$githubApiBaseUrl/search/repositories?q=user:$username&sort=stars&order=desc"));

  if (response.statusCode == 200) {
    var json = (jsonDecode(response.body)["items"] as List)
        .map((item) => GitHubUserRepo.fromJson(item))
        .take(10)
        .toList();
    return json;
  } else {
    throw Exception("Failed to load user repositories");
  }
}
