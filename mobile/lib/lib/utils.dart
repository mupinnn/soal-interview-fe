import "package:flutter/material.dart";

Color getLanguageColor(String language) {
  var colors = {
    "JavaScript": Colors.yellow.shade400,
    "TypeScript": Colors.blue.shade500,
    "Python": Colors.green.shade500,
    "Java": Colors.red.shade500,
    "C#": Colors.purple.shade500,
    "PHP": Colors.indigo.shade400,
    "Ruby": Colors.red.shade600,
    "Go": Colors.blue.shade400,
    "Rust": Colors.orange.shade600,
    "Swift": Colors.orange.shade500,
    "Kotlin": Colors.purple.shade400,
    "Dart": Colors.blue.shade300,
  };

  return colors[language] ?? Colors.grey.shade400;
}

String formatDate(String date) {
  return date;
}
