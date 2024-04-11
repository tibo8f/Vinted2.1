import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
            backgroundColor: const Color.fromARGB(255, 240, 79, 79),
            title: const Text('Vinted 2.0')),
        body: Container(
          margin: const EdgeInsets.all(100),
          padding: const EdgeInsets.all(10),
          color: Colors.amber,
          child: const Text("coucou"),
        ),
      ),
    );
  }
}
